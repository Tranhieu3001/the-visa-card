# Đây là một ví dụ đơn giản, sử dụng Python và mô phỏng quá trình quét thẻ vào đầu thu

class POSMachine:
    def process_card(self, card_info):
        # Giả sử đây là hàm xử lý thông tin thẻ trên máy POS
        print("Processing card...")
        print(f"Card information received: {card_info}")
        # Các bước xử lý khác có thể được thực hiện ở đây

class Smartphone:
    def scan_card(self):
        # Giả sử đây là hàm quét thẻ trên điện thoại thông minh
        print("Scanning card...")
        card_info = input("Enter card information: ")
        return card_info

# Mô phỏng quá trình sử dụng POSMachine và Smartphone
if __name__ == "__main__":
    pos_machine = POSMachine()
    smartphone = Smartphone()

    # Giả sử người dùng chọn sử dụng điện thoại để quét thẻ
    card_info = smartphone.scan_card()

    # Sau khi quét xong, chuyển thông tin thẻ cho máy POS xử lý
    pos_machine.process_card(card_info)
