class Vietlot {
    codeVietlot = new Array(6);

    constructor(arr) {
        this.codeVietlot = arr;
    }

    setCodeVietlot(code) {
        this.codeVietlot = code;
    }

    getCodeVietlot() {
        return this.codeVietlot;
    }

    checkTicket() {
        let count = 0;
        for (let i = 5; i >= 0; i--) {
            if (ticketVietlot[i] == this.codeVietlot[i]) {
                count++;
            } else {
                break;
            }
        }
        return count;
    }
}

class Customer {
    name;
    ticketArr = [];

    constructor(name) {
        this.name = name;
    }

    setName(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setVietlot(arrOfTicket) {
        this.ticketArr = arrOfTicket;
    }

    getTicketArr() {
        return this.ticketArr;
    }

    toString() {
        let string = '';
        for (let i = 0; i < this.ticketArr.length; i++) {
            string += this.ticketArr[i].codeVietlot.join(" ");
            string += "\n";
        }
        return string;
    }

    buyTicket() {
        if (this.ticketArr.length >= 4) {
            alert("Bạn chỉ có thể có tối đa 4 vé");
            return;
        }
        let choose;
        // do {
        do {
            choose = prompt("1.Tự nhập vé\n2.Hệ thống random vé\n");
            if (choose == "1" || choose == "2") {
                break;
            }
        } while (true);
        switch (choose) {
            case "1":
                let inputTicket;
                do {
                    inputTicket = prompt("Nhập vé theo định dạng xy-xy-xy-xy-xy-xy: ");
                    if (inputTicket.length != 17) {
                        continue;
                    } else {
                        let boolean = inputTicket.substring(0, 2) >= "0" && inputTicket.substring(0, 2)
                            && inputTicket.substring(3, 5) >= "0" && inputTicket.substring(3, 5)
                            && inputTicket.substring(6, 8) >= "0" && inputTicket.substring(6, 8)
                            && inputTicket.substring(9, 11) >= "0" && inputTicket.substring(9, 11)
                            && inputTicket.substring(12, 14) >= "0" && inputTicket.substring(12, 14)
                            && inputTicket.substring(15, 17) >= "0" && inputTicket.substring(15, 17);
                        if (boolean) {
                            break;
                        }
                    }
                } while (true);
                let tempArr1 = [];
                tempArr1.push(parseInt(inputTicket.substring(0, 2)));
                tempArr1.push(parseInt(inputTicket.substring(3, 5)));
                tempArr1.push(parseInt(inputTicket.substring(6, 8)));
                tempArr1.push(parseInt(inputTicket.substring(9, 11)));
                tempArr1.push(parseInt(inputTicket.substring(12, 14)));
                tempArr1.push(parseInt(inputTicket.substring(15, 17)));
                let ticket = new Vietlot(tempArr1);
                this.ticketArr.push(ticket);
                console.log(this.toString());
                outputTicket += '<input type="text" disabled="disabled" maxlength="2" value="' + tempArr1[0] + '">\n' +
                    '<input type="text" disabled="disabled" maxlength="2" value="' + tempArr1[1] + '">\n' +
                    '<input type="text" disabled="disabled" maxlength="2" value="' + tempArr1[2] + '">\n' +
                    '<input type="text" disabled="disabled" maxlength="2" value="' + tempArr1[3] + '">\n' +
                    '<input type="text" disabled="disabled" maxlength="2" value="' + tempArr1[4] + '">\n' +
                    '<input type="text" disabled="disabled" maxlength="2" value="' + tempArr1[5] + '"><br><br>';
                document.getElementById('ticket').innerHTML = outputTicket;
                break;
            case "2":
                let tempArr2 = [];
                for (let i = 1; i <= 6; i++) {
                    let randomNumber = Math.floor(Math.random() * 99);
                    tempArr2.push(randomNumber);
                }
                this.ticketArr.push(new Vietlot(tempArr2));
                outputTicket += '<input type="text" disabled="disabled" maxlength="2" value="' + tempArr2[0] + '">\n' +
                    '<input type="text" disabled="disabled" maxlength="2" value="' + tempArr2[1] + '">\n' +
                    '<input type="text" disabled="disabled" maxlength="2" value="' + tempArr2[2] + '">\n' +
                    '<input type="text" disabled="disabled" maxlength="2" value="' + tempArr2[3] + '">\n' +
                    '<input type="text" disabled="disabled" maxlength="2" value="' + tempArr2[4] + '">\n' +
                    '<input type="text" disabled="disabled" maxlength="2" value="' + tempArr2[5] + '"><br><br>';
                document.getElementById('ticket').innerHTML = outputTicket;

                break;
        }
        let outputButton = '';
        outputButton += '<button onclick="muaVe()">Mua thêm</button>' +
            '<button onclick="xemKetQua()">Xem kết quả</button>';
        document.getElementById('button').innerHTML = outputButton;
        // } while (true);
    }
}

function muaVe() {
    customer.buyTicket();
}

function xemKetQua() {
    let giaiNhat = 0, giaiNhi = 0, giaiKhuyenKhich = 0;
    for (let i = 0; i < customer.getTicketArr().length; i++) {
        if (customer.getTicketArr()[i].checkTicket() == 6) {
            giaiNhat++;
        } else if (customer.getTicketArr()[i].checkTicket() == 5) {
            giaiNhi++;
        } else if (customer.getTicketArr()[i].checkTicket() >= 3) {
            giaiKhuyenKhich++;
        }
    }
    if (giaiNhat == 0 && giaiNhi == 0 && giaiKhuyenKhich == 0) {
        document.getElementById('result').innerHTML = "Chúc bạn may mắn lần sau";
    } else document.getElementById('result').innerHTML = "Chúc mừng bạn đã trúng: \n" + giaiNhat + " giải nhất, " + giaiNhi + " giải nhì và " + giaiKhuyenKhich + " giải khuyến khích";
    setTimeout('location.reload()', 3000);

}

function init() {
    document.getElementById('button').innerHTML = '<button onclick="muaVe()">MUA VÉ</button>';
}

//Start from here
let customer = new Customer("Mạnh Dũng");
let outputTicket = '';
let ticketVietlot = [];
for (let i = 1; i <= 6; i++) {
    let randomNumber = Math.floor(Math.random() * 99);
    ticketVietlot.push(randomNumber);
}
console.log(ticketVietlot.join(" "));