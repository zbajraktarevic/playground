
export class GlobalEventDriverService {

  public static instance: GlobalEventDriverService = GlobalEventDriverService.getInstance();

  private listenerIndex = 0;

  listOfListeners: GlobalListener[] = [];

  private constructor() {}

  static getInstance() {
    if (!GlobalEventDriverService.instance) {
      GlobalEventDriverService.instance = new GlobalEventDriverService();
    }

    return GlobalEventDriverService.instance;
  }

  public listen(name: string, callback: CallableFunction = () => { }): GlobalListener {
    const listener = new GlobalListener(name, callback);
    this.listOfListeners.push(listener);
    ++this.listenerIndex;
    listener.setId(this.listenerIndex);
    return listener;
  }


  public dispatch(name:string, ...args:any) {
    for (let listener of this.listOfListeners) {

      // notify all listeners about this event
      if (listener.name === name) {
        console.log(`Executing listener with name "${listener.name}" with id: ${listener.id}`, args);
        listener.callback(...args);
      }
    }
  }

  public unsubscribe(id: number) {
    let newList: GlobalListener[] = [];
    for (const listener of this.listOfListeners) {
      if (listener.id != id) {
        newList.push(listener);
      }
    }
    this.listOfListeners = newList;
  }

}


export class GlobalListener {
  public id: number = 0;
  public name: string;
  public callback: CallableFunction = () => {}

  constructor(name:string, callableFunction: CallableFunction) {
    this.name = name;
    this.callback = callableFunction;
  }

  public setId(id: number) {
    this.id = id;
  }

  public getId() {
    return this.id;
  }

  unsubscribe() {
    let i = GlobalEventDriverService.getInstance();
    i.unsubscribe(this.id);
  }

}


