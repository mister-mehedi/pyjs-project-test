import { useEffect, useState } from 'react'
import ContactList from './ContactList'
import './App.css'
import ContactForm from './ContactForm'

function App() {
  // const [contacts, setContacts] = useState([{ "firstName": "Mehedi", "lastName": "Hasan", "email": "abc@gmail.com", "id": "101" }])
  const [contacts, setContacts] = useState([])
  const [isModalOpen, setIsModelOpen]= useState(false)
  const [currentContact, setCurrentContact] = useState({})

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts")
    const data = await response.json()
    setContacts(data.contacts)
  }

  const closeModal =()=>{
    setIsModelOpen(false)
    setCurrentContact({})
  }

  const openCreateModal=() =>{
    if(!isModalOpen) setIsModelOpen(true)
  }

  const openEditModal = (contact)=>{
    if(isModalOpen) return
    setCurrentContact(contact)
    setIsModelOpen(true)
  }

  const onUpdate=()=>{
    closeModal()
    fetchContacts()
  }

  return <>
    <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate}></ContactList>
    <button onClick={openCreateModal}>Create New Contact</button>
    {
      isModalOpen && <div className='modal'>
        <div className='modal-content'>
          <span className='close' onClick={closeModal}>&times;</span>
          <ContactForm existingContact={currentContact} updateCallback={onUpdate}></ContactForm>
        </div>
      </div>
    }
  </>
}

export default App
