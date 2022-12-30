import create from "../styles/create.module.css";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";

var weeks = ["monday", "tuesday", "wednesday", "thursday", "friday"];

export const CreateForm = ({ setCreated }) => {
  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("eventId")) !== null) {
      fetchEditEvent();
    }
  }, []);

  //fetch the details of the edit event
  const fetchEditEvent = async () => {
    try {
      var userId = await JSON.parse(sessionStorage.getItem("userId"));
      var eventId = await JSON.parse(sessionStorage.getItem("eventId"));
      axios.get(`/api/events/event/${eventId}&${userId}`).then((res) => {
        setInputs(res.data.data.Item.event);
        setEditable(true);
        res.data.data.Item.event.meetType === "offline"
          ? setType(true)
          : setType(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  //states
  const [inputs, setInputs] = useState({
    userId: JSON.parse(sessionStorage.getItem("userId")),
    name: "",
    duration: "",
    durationFormat: "Hour",
    date: "",
    days: "",
    meetType: "offline",
    weekDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    timing: {
      mon: {
        start: "09:00",
        end: "18:00",
      },
      tue: {
        start: "09:00",
        end: "18:00",
      },
      wed: {
        start: "09:00",
        end: "18:00",
      },
      thu: {
        start: "09:00",
        end: "18:00",
      },
      fri: {
        start: "09:00",
        end: "18:00",
      },
    },
  }); // input type state

  const [isOffline, setType] = useState(true); //event type state
  const [errors, setErrors] = useState({}); //error state
  const [warning, setWarning] = useState({}); //warning state
  const [processing, setProcessing] = useState(false); //processing state
  const [isEditable, setEditable] = useState(false); //foem editing

  //handle forms
  const handleInputs = (e) => {
    const keyName = e.target.name;
    const value = e.target.value;

    //to clear the warning messgae
    setErrors((prev) => {
      delete prev[keyName + "Error"];
      return prev;
    });

    //for changing meet type
    if (keyName === "meetType") {
      if (value === "online") {
        setType(false);
      } else {
        setType(true);
      }
    }

    //get week days
    if (keyName === "weekDays") {
      const checked = e.target.checked;
      if (checked) {
        weeks = [...weeks, value];
        if (weeks.includes(value)) {
          setInputs((prev) => ({
            ...prev,
            timing: {
              ...prev.timing,
              [value.substring(0, 3)]: {
                start: "09:00",
                end: "18:00",
              },
            },
          }));
        }
      } else {
        weeks = weeks.filter((e) => e !== value);
      }
      setInputs((prev) => ({ ...prev, weekDays: weeks }));
    } else if (keyName.includes("start") || keyName.includes("end")) {
      var time = keyName.split("-")[1];
      setInputs((prev) => ({
        ...prev,
        timing: {
          ...prev.timing,
          [keyName.substring(0, 3)]: {
            ...prev.timing[keyName.substring(0, 3)],
            [time]: value,
          },
        },
      }));
    } else {
      setInputs((prev) => ({ ...prev, [keyName]: value }));
    }
  };

  //validate form data
  const validate = () => {
    var err = {}; //error object

    //name validation
    var nameRegex = /^[A-Za-z\s]+$/;
    if (inputs.name === "") {
      err = { ...err, nameError: "Please enter a value." };
    } else if (!inputs.name.match(nameRegex)) {
      err = { ...err, nameError: "The name must be alphabets." };
    } else {
      delete err.nameError;
    }

    //duration validation
    if (inputs.duration === "") {
      err = { ...err, durationError: "Please enter a value." };
    } else if (parseInt(inputs.duration) <= 0) {
      err = { ...err, durationError: "Duration must be greater than zero." };
    } else if (
      parseInt(inputs.duration) > 6 &&
      inputs.durationFormat === "Hour"
    ) {
      err = { ...err, durationError: "Hour must be less than 6 hours." };
    } else {
      delete err.durationError;
    }

    //date validation
    if (inputs.date === "") {
      err = { ...err, dateError: "Please enter a value." };
    } else if (
      new Date(inputs.date).toString().substring(0, 15) <
      new Date().toString().substring(0, 15)
    ) {
      err = { ...err, dateError: "Date must not be in past." };
    } else {
      delete err.dateError;
    }

    //days validation
    if (inputs.days === "") {
      err = { ...err, daysError: "Please enter a value." };
    } else if (parseInt(inputs.days) <= 0) {
      err = { ...err, daysError: "Duration must greater than zero." };
    } else {
      delete err.daysError;
    }

    //address validation
    if (inputs.meetType === "offline") {
      if (inputs.address1 === "" || inputs.address1 === undefined) {
        err = { ...err, address1Error: "Please enter a value." };
      } else {
        delete err.address1Error;
      }
      if (inputs.address2 === "" || inputs.address2 === undefined) {
        err = { ...err, address2Error: "Please enter a value." };
      } else {
        delete err.address2Error;
      }
      if (inputs.address3 === "" || inputs.address3 === undefined) {
        err = { ...err, address3Error: "Please enter a value." };
      } else {
        delete err.address3Error;
      }
      if (inputs.address4 === "" || inputs.address4 === undefined) {
        err = { ...err, address4Error: "Please enter a value." };
      } else {
        delete err.address4Error;
      }
      if (inputs.address5 === "" || inputs.address5 === undefined) {
        err = { ...err, address5Error: "Please enter a value." };
      } else if (isNaN(inputs.address5)) {
        err = { ...err, address5Error: "Pincode must be numbers." };
      } else {
        delete err.address5Error;
      }
    } else {
      if (inputs.meetlink === "" || inputs.meetlink === undefined) {
        err = { ...err, meetlinkError: "Please enter a value." };
      } else {
        delete err.meetlinkError;
      }
    }

    //timing validation
    var noTimeError = true;
    for (const key in inputs.timing) {
      if (inputs.timing[key]["start"] > inputs.timing[key]["end"]) {
        noTimeError = false;
        err = {
          ...err,
          timingError: "The ending time must be greater than start time.",
        };
      }
    }
    if (noTimeError) {
      delete err.timingError;
    }

    setErrors(err);
    return Object.keys(err).length < 1;
  };

  //manage timing in inputs
  const manageTiming = () => {
    var array = inputs.weekDays.map((val) => val.substring(0, 3));
    for (const key in inputs.timing) {
      if (!array.includes(key)) {
        setInputs((prev) => {
          delete prev.timing[key];
          return prev;
        });
      }
    }
  };

  //submit forms
  const formSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      manageTiming();
      setProcessing(true);
      try {
        if (isEditable) {
          var eventId = JSON.parse(sessionStorage.getItem("eventId"));
          axios
            .put(`/api/events/event/${eventId}&${inputs.userId}`, inputs)
            .then((res) => {
              setProcessing(false);
              setWarning({});
              sessionStorage.removeItem("eventId");
              setCreated("updated");
            });
        } else {
          axios.post("/api/events/create", inputs).then((res) => {
            setProcessing(false);
            setWarning({});
            setCreated("created");
          });
        }
        setWarning({});
      } catch (error) {
        setWarning({ warnMsg: "Something went wrong please try again." });
        setProcessing(false);
        console.log(error);
      }
    }
  };

  return (
    <div className={create.container}>
      <h2>Build an event</h2>
      <form className={create.form} onSubmit={formSubmit}>
        <div className={create.inputWrapper}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className={create.nameIp}
            onChange={handleInputs}
            value={inputs.name || ""}
          />
          <p>This will be the title of event.</p>
          <span>{errors.nameError || ""}</span>
        </div>
        <div className={create.inputWrapper}>
          <div className={create.innerwrap}>
            <div>
              <input
                type="text"
                name="duration"
                placeholder="Duration"
                className={create.durationIp}
                onChange={handleInputs}
                value={inputs.duration || ""}
              />
              <p>This will be the time period of event.</p>
            </div>
            <select
              name="durationFormat"
              className={create.formatIp}
              onChange={handleInputs}
              value={inputs.durationFormat || ""}
            >
              <option value="Hour">Hour</option>
              <option value="Minutes">Min</option>
            </select>
          </div>
          <span>{errors.durationError || ""}</span>
        </div>
        <div className={create.inputWrapper}>
          <div className={create.innerwrap}>
            <div>
              <input
                type="date"
                name="date"
                placeholder="Start Date"
                className={create.dateIp}
                onChange={handleInputs}
                value={inputs.date || ""}
              />
              <p>Start date of he event.</p>
              <span>{errors.dateError || ""}</span>
            </div>
            <div>
              <input
                type="text"
                name="days"
                placeholder="Days"
                className={create.daysIp}
                onChange={handleInputs}
                value={inputs.days || ""}
              />
              <p>Number of days.</p>
              <span>{errors.daysError || ""}</span>
            </div>
          </div>
        </div>
        <div className={create.inputWrapper}>
          <textarea
            name="description"
            cols="100"
            rows="4"
            placeholder="About the event..."
            onChange={handleInputs}
            value={inputs.description || ""}
          ></textarea>
          <p>Details about the event.</p>
        </div>
        <div className={create.inputWrapper}>
          <div className={create.innerwrap2}>
            <div>
              <input
                type="radio"
                name="meetType"
                id="offline"
                value="offline"
                checked={inputs.meetType === "offline"}
                onChange={handleInputs}
              />
              <label htmlFor="offline">Offilne</label>
            </div>
            <div>
              <input
                type="radio"
                name="meetType"
                id="online"
                value="online"
                checked={inputs.meetType === "online"}
                onChange={handleInputs}
              />
              <label htmlFor="online">Online</label>
            </div>
          </div>
        </div>
        <div className={create.inputWrapper}>
          {isOffline ? (
            <div>
              <div>
                <input
                  type="text"
                  name="address1"
                  placeholder="Building No., Street"
                  className={create.addressIp}
                  onChange={handleInputs}
                  value={inputs.address1 || ""}
                />
                <p>Building number and street name.</p>
                <span>{errors.address1Error || ""}</span>
              </div>
              <div className={create.innerwrap}>
                <div>
                  <input
                    type="text"
                    name="address2"
                    placeholder="Area"
                    className={create.addressIp2}
                    onChange={handleInputs}
                    value={inputs.address2 || ""}
                  />
                  <p>Name of the Area</p>
                  <span>{errors.address2Error || ""}</span>
                </div>
                <div>
                  <input
                    type="text"
                    name="address3"
                    placeholder="District"
                    className={create.addressIp2}
                    onChange={handleInputs}
                    value={inputs.address3 || ""}
                  />
                  <p>Name of the District.</p>
                  <span>{errors.address3Error || ""}</span>
                </div>
              </div>
              <div className={create.innerwrap}>
                <div>
                  <input
                    type="text"
                    name="address4"
                    placeholder="State"
                    className={create.addressIp2}
                    onChange={handleInputs}
                    value={inputs.address4 || ""}
                  />
                  <p>Name of the State</p>
                  <span>{errors.address4Error || ""}</span>
                </div>
                <div>
                  <input
                    type="text"
                    name="address5"
                    placeholder="Pin code"
                    className={create.addressIp2}
                    onChange={handleInputs}
                    value={inputs.address5 || ""}
                  />
                  <p>Pin code of District.</p>
                  <span>{errors.address5Error || ""}</span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <input
                type="text"
                name="meetlink"
                placeholder="Meet link"
                className={create.meetIp}
                onChange={handleInputs}
                value={inputs.meetlink || ""}
              />
              <p>This will be the online meet link</p>
              <span>{errors.meetlinkError || ""}</span>
            </div>
          )}
        </div>
        <div className={create.inputWrapper}>
          <div className={create.innerwrap3}>
            <div className={create.checkbox}>
              <input
                type="checkbox"
                name="weekDays"
                value="monday"
                id="mon"
                checked={inputs.weekDays.includes("monday")}
                onChange={handleInputs}
              />
              <label htmlFor="mon">Monday</label>
            </div>
            {inputs.weekDays.includes("monday") ? (
              <div className={create.timebox}>
                <input
                  type="time"
                  name="mon-start"
                  min="06:00"
                  max="22:00"
                  value={inputs.timing.mon.start || "09:00"}
                  onChange={handleInputs}
                />
                <h6>to</h6>
                <input
                  type="time"
                  name="mon-end"
                  min="06:00"
                  max="22:00"
                  value={inputs.timing.mon.end || "18:00"}
                  onChange={handleInputs}
                />
              </div>
            ) : (
              <div className={create.emptyDiv}></div>
            )}
          </div>
          <div className={create.innerwrap3}>
            <div className={create.checkbox}>
              <input
                type="checkbox"
                name="weekDays"
                value="tuesday"
                id="tue"
                checked={inputs.weekDays.includes("tuesday")}
                onChange={handleInputs}
              />
              <label htmlFor="tue">Tuesday</label>
            </div>
            {inputs.weekDays.includes("tuesday") ? (
              <div className={create.timebox}>
                <input
                  type="time"
                  name="tue-start"
                  min="06:00"
                  max="22:00"
                  value={inputs.timing.tue.start || "09:00"}
                  onChange={handleInputs}
                />
                <h6>to</h6>
                <input
                  type="time"
                  name="tue-end"
                  min="06:00"
                  max="22:00"
                  value={inputs.timing.tue.end || "18:00"}
                  onChange={handleInputs}
                />
              </div>
            ) : (
              <div className={create.emptyDiv}></div>
            )}
          </div>
          <div className={create.innerwrap3}>
            <div className={create.checkbox}>
              <input
                type="checkbox"
                name="weekDays"
                value="wednesday"
                id="wed"
                checked={inputs.weekDays.includes("wednesday")}
                onChange={handleInputs}
              />
              <label htmlFor="wed">Wednesday</label>
            </div>
            {inputs.weekDays.includes("wednesday") ? (
              <div className={create.timebox}>
                <input
                  type="time"
                  name="wed-start"
                  min="06:00"
                  max="22:00"
                  value={inputs.timing.wed.start || "09:00"}
                  onChange={handleInputs}
                />
                <h6>to</h6>
                <input
                  type="time"
                  name="weekDays"
                  min="06:00"
                  max="22:00"
                  value={inputs.timing.wed.end || "18:00"}
                  onChange={handleInputs}
                />
              </div>
            ) : (
              <div className={create.emptyDiv}></div>
            )}
          </div>
          <div className={create.innerwrap3}>
            <div className={create.checkbox}>
              <input
                type="checkbox"
                name="weekDays"
                value="thursday"
                id="thu"
                checked={inputs.weekDays.includes("thursday")}
                onChange={handleInputs}
              />
              <label htmlFor="thu">Thursday</label>
            </div>
            {inputs.weekDays.includes("thursday") ? (
              <div className={create.timebox}>
                <input
                  type="time"
                  name="thu-start"
                  min="06:00"
                  max="22:00"
                  value={inputs.timing.thu.start || "09:00"}
                  onChange={handleInputs}
                />
                <h6>to</h6>
                <input
                  type="time"
                  name="thu-end"
                  min="06:00"
                  max="22:00"
                  value={inputs.timing.thu.end || "18:00"}
                  onChange={handleInputs}
                />
              </div>
            ) : (
              <div className={create.emptyDiv}></div>
            )}
          </div>
          <div className={create.innerwrap3}>
            <div className={create.checkbox}>
              <input
                type="checkbox"
                name="weekDays"
                value="friday"
                id="fri"
                checked={inputs.weekDays.includes("friday")}
                onChange={handleInputs}
              />
              <label htmlFor="fri">Friday</label>
            </div>
            {inputs.weekDays.includes("friday") ? (
              <div className={create.timebox}>
                <input
                  type="time"
                  name="fri-start"
                  min="06:00"
                  max="22:00"
                  value={inputs.timing.fri.start || "09:00"}
                  onChange={handleInputs}
                />
                <h6>to</h6>
                <input
                  type="time"
                  name="fri-end"
                  min="06:00"
                  max="22:00"
                  value={inputs.timing.fri.end || "18:00"}
                  onChange={handleInputs}
                />
              </div>
            ) : (
              <div className={create.emptyDiv}></div>
            )}
          </div>
          <div className={create.innerwrap3}>
            <div className={create.checkbox}>
              <input
                type="checkbox"
                name="weekDays"
                value="saturday"
                id="sat"
                checked={inputs.weekDays.includes("saturday")}
                onChange={handleInputs}
              />
              <label htmlFor="sat">Saturday</label>
            </div>
            {inputs.weekDays.includes("saturday") ? (
              <div className={create.timebox}>
                <input
                  type="time"
                  name="sat-start"
                  min="06:00"
                  max="22:00"
                  value={inputs.timing.sat.start || "09:00"}
                  onChange={handleInputs}
                />
                <h6>to</h6>
                <input
                  type="time"
                  name="sat-end"
                  min="06:00"
                  max="22:00"
                  value={inputs.timing.sat.end || "18:00"}
                  onChange={handleInputs}
                />
              </div>
            ) : (
              <div className={create.emptyDiv}></div>
            )}
          </div>
          <div className={create.innerwrap3}>
            <div className={create.checkbox}>
              <input
                type="checkbox"
                name="weekDays"
                value="sunday"
                id="sun"
                checked={inputs.weekDays.includes("sunday")}
                onChange={handleInputs}
              />
              <label htmlFor="sun">Sunday</label>
            </div>
            {inputs.weekDays.includes("sunday") ? (
              <div className={create.timebox}>
                <input
                  type="time"
                  name="sun-start"
                  min="06:00"
                  max="22:00"
                  value={inputs.timing.sun.start || "09:00"}
                  onChange={handleInputs}
                />
                <h6>to</h6>
                <input
                  type="time"
                  name="sun-end"
                  min="06:00"
                  max="22:00"
                  defaultValue="18:00"
                  onChange={handleInputs}
                />
              </div>
            ) : (
              <div className={create.emptyDiv}></div>
            )}
          </div>
        </div>
        <div className={create.span}>
          <span>{errors.timingError || ""}</span>
        </div>
        <div className={create.buttons}>
          <Link
            to="/dashboard"
            onClick={() => {
              sessionStorage.removeItem("eventId");
            }}
          >
            Cancel
          </Link>
          <button type="submit">
            {processing ? (
              <TailSpin
                height="25"
                width="25"
                color="#fff"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : isEditable ? (
              "Update"
            ) : (
              "Create"
            )}
          </button>
        </div>
        <div className={create.helptext}>
          <span>{warning.warnMsg || ""}</span>
        </div>
      </form>
    </div>
  );
};
