import {
  Digit_Eight,
  Digit_Five,
  Digit_Four,
  Digit_Nine,
  Digit_One,
  Digit_Seven,
  Digit_Six,
  Digit_Three,
  Digit_Two,
  Digit_Zero,
} from './digit';

type NumberProps = {
  value: number;
};

const digitComponents = [
  Digit_Zero,
  Digit_One,
  Digit_Two,
  Digit_Three,
  Digit_Four,
  Digit_Five,
  Digit_Six,
  Digit_Seven,
  Digit_Eight,
  Digit_Nine,
];
export default function Number_to_Digit({ value }: NumberProps) {
  const digitArray = value.toString().padStart(2, '0').split('');

  return (
    <div className="flex gap-x-2">
      {digitArray.map((digitStr, index) => {
        const digitNum = parseInt(digitStr, 10);
        const DigitComponent = digitComponents[digitNum];
        return <DigitComponent key={index} />;
      })}
    </div>
  );
}
