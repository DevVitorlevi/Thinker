// useFlash.js
import bus from "../utils/bus";

export default function useFlash() {
    function setFlash(message, type) {
        console.log("Emitindo evento flash:", message, type);
        bus.emit('flash', { message, type });
    }
    return { setFlash };
}
