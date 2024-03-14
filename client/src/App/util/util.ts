export function getCookie(key: string) {
    const b = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : "";
}

//b.pop() sẽ trả về mảng các phần tử match với key - nếu b ko trùng thì trả về mảng rỗng 


