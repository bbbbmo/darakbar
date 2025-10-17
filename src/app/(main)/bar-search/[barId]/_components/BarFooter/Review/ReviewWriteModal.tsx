import { Modal, ModalBody, ModalFooter, ModalHeader } from 'flowbite-react'

export default function ReviewWriteModal() {
  return (
    <Modal show={true} onClose={onClose} size="2xl">
      <ModalHeader className="bg-primary">칵테일 레시피</ModalHeader>
      <ModalBody className="bg-primary"></ModalBody>
      <ModalFooter className="bg-primary"></ModalFooter>
    </Modal>
  )
}
