import {makeObservable, observable, action, computed} from 'mobx';
import {globalStore} from '../global';

class About {
    // 官方文档: https://zh.mobx.js.org/observable-state.html#%E5%8F%AF%E7%94%A8%E7%9A%84%E6%B3%A8%E8%A7%A3
    count = 0;
    constructor() {
        /**
         * makeObservable 与 makeAutoObservable区别在于：
         * makeObservable: 需要显式地指定要转换为可观察对象的属性和方法。
         * makeAutoObservable: 自动将所有属性和方法转换为可观察对象。
         * 如何选择 ?
         * 1. 需要更细粒度地控制哪些属性或方法需要观察时，使用 makeObservable。
         * 2. 需要将整个类转换为响应式对象，而不需要对每个属性或方法进行个性化配置使用 makeAutoObservable。
         * 3. 注意: makeAutoObservable可能会不小心观察到不需要观察的属性或方法，导致性能问题。
         */
        makeObservable(this, {
            count: observable,
            aboutAddCount: action,
            getDouble: computed
        });
        /**
         * 常用装饰器类型:
         * observable: 将一个属性转换为可观察属性。当属性的值发生变化时，mobx 会自动通知观察者。
         * computed: 将一个属性转换为计算属性。计算属性的值是从其他可观察属性或计算属性中派生出来的，当依赖的属性发生变化时，计算属性会自动重新计算。
         * action: 将一个方法转换为动作。动作是一个可以修改状态的函数，只有通过动作来修改状态，mobx 才能跟踪状态的变化并通知观察者。
         * flow: 将一个方法转换为异步流。异步流是一个可以暂停和恢复的异步操作，可以用来实现复杂的异步逻辑。
         */
    }

    get getDouble() {
        return this.count * 2;
    }

    aboutAddCount = () => {
        const {count: globalCount} = globalStore;
        this.count += globalCount;
    };
}

const aboutStore = new About();
export {aboutStore};
