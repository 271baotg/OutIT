import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from "@chakra-ui/react"
import { FaCheckCircle } from "react-icons/fa"
import { MdOutlineErrorOutline } from "react-icons/md"
import { useNavigate } from "react-router-dom"

export const FailModal: React.FC<{isOpenFailModal:boolean, onCloseFaildModal:Function, backTopStep1:Function}> = (props) => {
    const handleOnReEnterInfo = () =>{
        props.onCloseFaildModal();
        props.backTopStep1();
    }
    return (
        <Modal isOpen={props.isOpenFailModal} onClose={() => { props.onCloseFaildModal() }} motionPreset="slideInRight" size='md'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Kết quả đăng ký</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <div className="d-flex flex-column align-items-center">
                    <MdOutlineErrorOutline size='120' color="red"/>
                        <p className="text-center">Đăng ký không thành công username đã có người đăng ký
                        </p>
                    </div>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={() => { props.onCloseFaildModal() }}>
                        Đóng
                    </Button>
                    <Button onClick={handleOnReEnterInfo} colorScheme="green">Nhập lại thông tin</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}