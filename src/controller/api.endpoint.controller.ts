import { io } from "..";

export const handleProcessed = (req, res) => {
    try {
        /* console.log('all good innit?', req.body);
        io.to("t4QMQJQzofp7BSM6AAAF").emit('processed', 'my mannnn'); */
    } catch (e) {
        console.log(e, ' is the error man...');
    }
}