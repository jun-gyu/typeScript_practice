import * as CryptoJS from "crypto-js";

class Block {
  static calculateBlockHash = (
    index: number,
    previousHash: string,
    timestamp: number,
    data: string
  ): string =>
    CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

  static validateStructure = (aBlock: Block): boolean =>
    typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.data === "string";

  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

const genesisBlock: Block = new Block(0, "20202020", "", "hello", 123123);

let blockchain: Block[] = [genesisBlock];

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): void => {
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index + 1;
  const newTimestamp: number = getNewTimeStamp(); //원하는 타입을 리턴하지 않는 함수면 에러를 만듬 코드작성시 은연중에 할 수 있는 실수들을 줄여줌. 의외의 오류 방지. 개발시간 단축가능. 처음 설정할때는 시간이 걸리겠지만.
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    previousBlock.hash,
    newTimestamp,
    data
  );
  const newBlock: Block = new Block(
    newIndex,
    newHash,
    previousBlock.hash,
    data,
    newTimestamp
  );
  addBlock(newBlock);
};

const getHashforBlock = (aBlock: Block): string =>
  Block.calculateBlockHash(
    aBlock.index,
    aBlock.previousHash,
    aBlock.timestamp,
    aBlock.data
  );

const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
  if (!Block.validateStructure(candidateBlock)) {
    return false;
  } else if (previousBlock.index + 1 !== candidateBlock.index) {
    return false;
  } else if (previousBlock.hash !== candidateBlock.previousHash) {
    return false;
  } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
    return false;
  } else {
    return true;
  }
};

const addBlock = (candidateBlock: Block): void => {
  if (isBlockValid(candidateBlock, getLatestBlock())) {
    blockchain.push(candidateBlock);
  }
};

createNewBlock("second_Block");
createNewBlock("third_Block");
createNewBlock("fourth_Block");
createNewBlock("fourth_Block");
createNewBlock("fourth_Block");
createNewBlock("fourth_Block");

console.log(blockchain);
// interface Human {
//   name: string;
//   age: number;
//   gender: string;
// }
// //변수 하나하나 타입을 써주기보다 interface 라는 객체에 모아두어 모든 타입을 정함.

// const person = {
//   name: "leejungyu",
//   gender: "male",
//   age: 22,
// };
// const sayHi = (person: Human): string => {
//   // 함수가 어떤 타입을 return 할껀지도 명명해줘야함
//   //파라미터의 ? 는 선택적 파라미터라는 표시. 반드시 들어오지 않을수 있다.
//   return `hello ${person.name}, you are ${person.age}, you are a ${person.gender}`;
// };
// console.log(sayHi(person)); // 설정한 매개변수만큼 전달인자가 들어오지 않은채 컴파일하면 오류로 알려줌.

// //타입스크립트 법칙 모듈화 되어야한다.
// export {};

// //nodemon 대신 TSC watch
