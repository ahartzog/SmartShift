import { observable, action, makeObservable } from 'mobx';

class DemoStore {
  constructor() {
    makeObservable(this, {
      daysBack: observable,
      setDaysBack: action,
    });
  }

  daysBack = 10;

  setDaysBack = (num: number) => {
    this.daysBack = num;
  };
}

export { DemoStore };
