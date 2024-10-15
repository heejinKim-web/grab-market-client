import React from "react";

function TimerComponent() {
  const [time, setTime] = React.useState(0);
  console.log("컴포넌트 업데이트");
  React.useEffect(function () {
    setTime(time + 1);
    console.log("컴포넌트가 화면에 처음 렌더링 될 때 딱 한 번 실행합니다.");
  }, []);
  return (
    <div>
      <h3>{time}초</h3>
      <button>1씩 올려주세요</button>
    </div>
  );
}

export default TimerComponent;
