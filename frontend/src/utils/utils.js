export function uuid () {
    return `xxxxxxxx-xxxx-4xxx-yxxx-${Date.now().toString(16)}`.replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
    );
}