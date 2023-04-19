import React from 'react'
import {useDisclosure} from '@chakra-ui/hooks'
import { IconButton,Image,Button,Modal,ModalOverlay
    ,ModalHeader,ModalContent,Text,ModalCloseButton ,ModalBody,ModalFooter} from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons';
import { DataState } from '../context/Provider';
const ProfileModel =({children})=> {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {user} = DataState();
  
  return <>
  {
      children? (<span onClick={onOpen} >{children}</span>):(
          <IconButton d={{base:"flex"}} icon={<ViewIcon/>} onClick={onOpen} />
      )
  }
  <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width={{base:"300px",md:"400px"}}>
          <ModalHeader
          fontSize="40px"
          fontFamily="work sans"
          d="flex"
          justifyContent="center"
          >{user?user.name:""}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
          d="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="space-between"
          >
           <Image
           borderRadius="full"
           boxSize="150px"
           src={user?user.pic:""}
           alt={user?user.name:""}
           />
           <Text>Email : {user?user.email:"guest"}</Text>
          </ModalBody>

          <ModalFooter>
            <Button bg="#031630" className="btn" color="white" mr={3} onClick={onClose}>
              Close
            </Button>

          </ModalFooter>
        </ModalContent>
      </Modal>
  </>
}

export default ProfileModel