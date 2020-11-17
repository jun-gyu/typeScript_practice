const name = "jungyu";
const age = 24;
const gender = "male";

const sayHi = (name, age, gender?) => {
  //파라미터의 ? 는 선택적 파라미터라는 표시. 반드시 들어오지 않을수 있다.
  console.log(`hello ${name}, you are ${age}, you are a ${gender}`);
};
sayHi(name, age); // 설정한 매개변수만큼 전달인자가 들어오지 않은채 컴파일하면 오류로 알려줌.

//타입스크립트 법칙 모듈화 되어야한다.
export {};
