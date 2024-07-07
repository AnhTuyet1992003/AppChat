// Encode a string to a UTF-8 byte array, thêm 1 text ở đầu để phân biệt nó với các tin nhắn khác chưa encode
export function encode(text) {
    const encoder = new TextEncoder();
    return "encode" + encoder.encode(text).toString();
}

// Decode a UTF-8 byte array to a string
//decode những tin nhắn mà đã encode theo project
export function decode(encodedText) {
    const decoder = new TextDecoder();
    //Kiểm tra xem có phải text mà project decode hay không
    if (!encodedText.includes("encode")) {
        return encodedText;
    }
    try {
        encodedText = encodedText.replace('encode','');
        const byteArray = new Uint8Array(encodedText.split(',').map(byte => parseInt(byte)));
        return decoder.decode(byteArray);
    } catch (error) {
        return encodedText;
    }

}