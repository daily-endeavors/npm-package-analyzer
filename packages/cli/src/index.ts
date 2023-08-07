import * as Const from './resource/const'
import * as Type from './resource/type'


async function asyncRunner() {
    const demo: Type.json = {
        "package_name": "demo",
        "version": "3.4.5"
    }

    console.log("hello world", "demo => ", demo)
}

asyncRunner()