import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

export const SuccessModal: React.FC<{
  handleOnClickSignin: Function;
  isOpenSuccessModal: boolean;
  onCloseSuccessModal: Function;
}> = (props) => {
  return (
    <Modal
      isOpen={props.isOpenSuccessModal}
      onClose={() => {
        props.onCloseSuccessModal();
      }}
      motionPreset="slideInRight"
      size="md"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Kết quả đăng ký</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="d-flex flex-column align-items-center">
            <FaCheckCircle color="green" size="120" />
            <p className="text-center">
              Bạn đã đăng ký thành công, để tiếp tục hãy đến trang
              <a
                href={`login`}
                style={{ color: "blue", textDecoration: "underline" }}
              >
                <i> Đăng nhập</i>
              </a>
            </p>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              props.onCloseSuccessModal();
            }}
          >
            Đóng
          </Button>
          <Button
            colorScheme="green"
            onClick={() => {
              props.handleOnClickSignin();
            }}
          >
            Tới trang Đăng nhập
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
