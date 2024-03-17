function solution(phoneBook) {
    phoneBook.sort();

    for (let i = 0; i < phoneBook.length - 1; i++) {
        if (phoneBook[i + 1].startsWith(phoneBook[i])) {
            return false;
        }
    }

    return true;
}