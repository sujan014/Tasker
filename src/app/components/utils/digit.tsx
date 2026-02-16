// type digitProp = {
//   value: number;
// };

// export default function Digit({ value }: digitProp) {
//   return <div></div>;
// }

export function Digit_One() {
  return (
    <div className="flex-col">
      <Shifted_Vertical_line />
      <Shifted_Vertical_line moreClass="relative -top-[14px]" />
    </div>
  );  
}

export function Digit_Two() {
  return (
    <div className="flex-col">
      <Left_Open_Box />
      <Right_Open_Box moreClass="relative -top-[14px]" />
    </div>
  );
}

export function Digit_Three() {
  return (
    <div className="flex-col">
      <Left_Open_Box />
      <Left_Open_Box moreClass="relative -top-[14px]" />
    </div>
  );
}

export function Digit_Four() {
  return (
    <div className="flex-col">
      <Top_Open_Box />
      <Vertical_line moreClass="relative -top-[14px] left-[50px]" />
    </div>
  );
}

export function Digit_Five() {
  return (
    <div className="flex-col">
      <Right_Open_Box />
      <Left_Open_Box moreClass="relative -top-[14px]" />
    </div>
  );
}

export function Digit_Six() {
  return (
    <div className="flex-col">
      <Right_Open_Box />
      <Closed_Box moreClass="relative -top-[14px]" />
    </div>
  );
}

export function Digit_Seven() {
  // return (
  //   <div className="flex-col border">
  //     <Digit_One />
  //     <Horizontal_line moreClass="relative -top-[130px]" />
  //   </div>
  // );
  return (
    <div className="flex-col">
      <div className="w-[64px] h-[14px] bg-blue-700"></div>
      <div className="flex-col">
        <div className="w-[14px] h-[114px] relative left-[50px] -top-[14px] bg-blue-700"></div>
      </div>
    </div>
  );
}

export function Digit_Eight() {
  return (
    <div className="flex-col">
      <Closed_Box />
      <Closed_Box moreClass="relative -top-[14px]" />
    </div>
  );
}

export function Digit_Nine() {
  return (
    <div className="flex-col">
      <Closed_Box />
      <Left_Open_Box moreClass="relative -top-[14px]" />
    </div>
  );
}

export function Digit_Zero() {
  return (
    <div className="flex-col">
      <Bottom_Open_Box />
      <Top_Open_Box moreClass="relative -top-[14px]" />
    </div>
  );
}

export function TimeDot({
  state,
  toggleState,
}: {
  state: boolean;
  toggleState: boolean;
}) {
  if (state) {
    return (
      <div className="h-[114px] w-[14px] flex flex-col justify-evenly items-center">
        <div className="w-[14px] h-[14px] bg-blue-950 rounded-full"></div>
        <div className="w-[14px] h-[14px] bg-blue-950 rounded-full"></div>
      </div>
    );
  }
  if (!toggleState) {
    return (
      <div className="h-[114px] w-[14px] flex flex-col justify-evenly items-center">
        <div className="w-[14px] h-[14px] bg-blue-950 rounded-full"></div>
        <div className="w-[14px] h-[14px] bg-blue-950 rounded-full"></div>
      </div>
    );
  }
  if (toggleState) {
    return (
      <div className="h-[114px] w-[14px] flex flex-col justify-evenly items-center">
        <div className="w-[14px] h-[14px] rounded-full"></div>
        <div className="w-[14px] h-[14px] rounded-full"></div>
      </div>
    );
  }
}

type classProp = {
  moreClass?: string;
};
// const Horizontal_line = ({ moreClass = '' }: classProp) => {
//   return (
//     <div className={`flex ${moreClass}`}>
//       <div className="w-[64px] h-[14px] bg-blue-700"></div>
//     </div>
//   );
// };

export function Vertical_line({ moreClass = '' }: classProp) {
  return (
    <div className={`flex-col ${moreClass}`}>
      <div className="w-[14px] h-[64px] bg-blue-700"></div>
    </div>
  );
}

export function Shifted_Vertical_line({ moreClass = '' }: classProp) {
  return (
    <div
      className={`h-[64px] w-[64px] border-r-[14px] border-r-blue-700 ${moreClass}`}
    ></div>
  );
}

function Closed_Box({ moreClass = '' }: classProp) {
  return (
    <div
      className={`h-[64px] w-[64px] border-[14px] border-blue-700 ${moreClass}`}
    ></div>
  );
}
function Left_Open_Box({ moreClass = '' }: classProp) {
  return (
    <div
      className={`h-[64px] w-[64px] border-t-[14px] border-b-[14px] border-r-[14px] border-t-blue-700 border-b-blue-700 border-r-blue-700 ${moreClass}`}
    ></div>
  );
}

function Right_Open_Box({ moreClass = '' }: classProp) {
  return (
    <div
      className={`h-[64px] w-[64px] border-t-[14px] border-b-[14px] border-l-[14px] border-t-blue-700 border-b-blue-700 border-l-blue-700 ${moreClass}`}
    ></div>
  );
}

function Top_Open_Box({ moreClass = '' }: classProp) {
  return (
    <div
      className={`h-[64px] w-[64px] border-r-[14px] border-b-[14px] border-l-[14px] border-r-blue-700 border-b-blue-700 border-l-blue-700 ${moreClass}`}
    ></div>
  );
}

function Bottom_Open_Box({ moreClass = '' }: classProp) {
  return (
    <div
      className={`h-[64px] w-[64px] border-t-[14px] border-r-[14px] border-l-[14px] border-t-blue-700 border-r-blue-700 border-l-blue-700 ${moreClass}`}
    ></div>
  );
}
