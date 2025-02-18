import { useState } from "react";
import clsx from "clsx";
import Button from "../Primitives/Button/Button";
import Card from "../Primitives/Card/Card";

const ClockInCard = () => {
  const [isClockIn, setIsClockIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [lastClokInDetails, setLastClockInDetails] = useState({
    in: undefined,
    out: undefined,
  });

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleClockIn = async () => {
    setIsLoading(true);
    await delay(2000);
    setIsClockIn(true);
    setIsLoading(false);
    const currentTime = new Date();
    setClockInTime(currentTime);
    if (!lastClokInDetails.in) {
      setLastClockInDetails({
        out: undefined,
        in: currentTime,
      });
    }
  };

  const handleClockOut = async () => {
    setIsLoading(true);
    await delay(2000);
    setIsClockIn(false);
    setIsLoading(false);
    setClockInTime(null);
    setLastClockInDetails({
      in: clockInTime,
      out: new Date(),
    });
  };

  return (
    <Card>
      <div className="flex items-center gap-8 w-full">
        <div className="grow">
          {isClockIn && (
            <div>
              <p className="text-green-600 font-semibold">
                You are clocked in!
              </p>
              <p className="text-gray-700 my-2">
                Clock-in Time: {clockInTime?.toLocaleTimeString()}
              </p>
            </div>
          )}
          <div className="flex">
            {isClockIn ? (
              <Button
                variant="outlined"
                onClick={handleClockOut}
                loading={isLoading}
              >
                Clock Out
              </Button>
            ) : (
              <Button
                variant="filled"
                loading={isLoading}
                onClick={handleClockIn}
              >
                Clock In
              </Button>
            )}
          </div>
        </div>
        <div className="w-px bg-gray-300 self-stretch" />
        <div className="text-center">
          <p>Average Hr per day</p>
          <p className="text-2xl font-bold">8 Hr</p>
        </div>
      </div>
      <div className="h-px bg-gray-200 self-stretch my-4" />
      <div>
        <p className="font-semibold">Last Clock in details</p>
        <p>
          In:{" "}
          {lastClokInDetails.in
            ? lastClokInDetails.in.toLocaleTimeString()
            : "-"}
        </p>
        <p>
          Out:{" "}
          {lastClokInDetails.out
            ? lastClokInDetails.out.toLocaleTimeString()
            : "-"}
        </p>
      </div>
    </Card>
  );
};

export default ClockInCard;
