import bus from "../utils/bus";

export default function useFlash() {

    function setFlash(message,type) {

        bus.emit('flash', { message, type });
    }
    return { setFlash };
}