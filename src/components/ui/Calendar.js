import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useState, useEffect, useCallback } from "react";
require("node_modules/globalize/lib/cultures/globalize.culture.pt-BR");
import classes from "./Calendar.module.css";

const localizer = momentLocalizer(moment);

let DUMMY_PREV_EXERCISES = [
  {
    title: "A",
    start: new Date(2023, 3, 4), // year - month (starting at 0) - day
    end: new Date(2023, 3, 4),
    allDay: true,
  },
  {
    title: "B",
    start: new Date(2023, 3, 5), // year - month (starting at 0) - day
    end: new Date(2023, 3, 4),
    allDay: true,
  },
  {
    title: "C",
    start: new Date(2023, 3, 6), // year - month (starting at 0) - day
    end: new Date(2023, 3, 4),
    allDay: true,
  },
];

const ExerciseCalendar = (props) => {
  const eventStyleGetter = useCallback(
    (event, start, end, isSelected) => ({
      ...(event.title.includes("A") && {
        className: classes.A,
      }),
      ...(event.title.includes("B") && {
        className: classes.B,
      }),
      ...(event.title.includes("C") && {
        className: classes.C,
      }),
    }),
    []
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }

  const messages = {
    previous: "Anterior",
    next: "Próximo",
    today: "Hoje",
  };

  const calendarStyle = (date) => {
    let currentDate = `${new Date().getDate()} ${
      new Date().getMonth() + 1
    } ${new Date().getFullYear()}`;
    let allDate = `${date.getDate()} ${
      date.getMonth() + 1
    } ${date.getFullYear()}`;

    if (allDate === currentDate)
      return {
        style: {
          backgroundColor: "#a748ef",
          margin: 0,
          padding: 0,
        },
      };
  };

  return (
    <div style={{ height: "350px" }}>
      <Calendar
        style={{ height: 350 }}
        className={classes.calendar}
        localizer={localizer}
        culture="PT-BR"
        events={DUMMY_PREV_EXERCISES}
        views={["month"]}
        messages={messages}
        dayPropGetter={calendarStyle}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default ExerciseCalendar;
