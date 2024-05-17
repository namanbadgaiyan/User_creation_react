import { nanoid } from "nanoid"
import { useState } from "react"

function App() {

  const [Username, setUsername] = useState("")
  const [Email, setEmail] = useState("")
  const [Contact, setContact] = useState("")
  const [Users, setUsers] = useState(JSON.parse(localStorage.getItem('Users')) || [])

  const submitHandler = (e) => {
    e.preventDefault()

    console.log(Username,Email,Contact);
    const newuser = {id:nanoid(), Username, Email, Contact}
    console.log(newuser);
    setUsers([...Users, newuser])
    localStorage.setItem("Users", JSON.stringify([Users , newuser]))
    console.log(Users);
    setUsername("")
    setEmail("")
    setContact("")

  }

  const deleteHandler = (id) => {
    setUsers(Users.filter(user => user.id !== id));
    localStorage.setItem("Users", JSON.stringify([Users.filter(user => user.id !== id)]))
  }
  return (
    <>
      <h1 className="text-[3vw] font-bold text-center">USER BASE</h1>
      <form onSubmit={(e) => {submitHandler(e)}} className="flex gap-5 p-5 px-[22vw]">
        <input type="text" 
          name="username" 
          className="px-4 py-2 border-2 rounded-[2vh] border-red-600" 
          placeholder="Enter ur name" 
          onChange={(e) => setUsername(e.target.value)}
          value={Username} />

          <input type="email" 
          name="Email" 
          className="px-4 py-2 border-2 rounded-[2vh] border-red-600" 
          placeholder="Enter ur email" 
          onChange={(e) => setEmail(e.target.value)}
          value={Email} />

          <input type="number" 
          name="Contact" 
          className="px-4 py-2 border-2 rounded-[2vh] border-red-600" 
          placeholder="Enter ur contact" 
          onChange={(e) => setContact(e.target.value)}
          value={Contact} />

          <button type="submit"
            className="px-4 py-2 border-2 border-blue-600 rounded-[2vh]"
            onClick={(e) => {submitHandler(e)}}
            >Create</button>
      </form>
      <hr /><hr /><hr /><hr />
      <div className="grid grid-cols-4 gap-5 p-5">
        {Users.length > 0 ? (
          Users.map((user)=>{
            return(
              <div key={user.id} className="w-[17vw] h-[28vh] border-2 rounded-[2vh] px-5 py-3 flex flex-col gap-3">
                <h1 className="text-[2vh] font-bold">Name: {user.Username}</h1>
                <h1 className="text-[2vh] font-semibold">Email: {user.Email}</h1>
                <h1 className="text-[2vh] font-semibold">Contact: {user.Contact}</h1>
                <button className="px-4 py-2 border-2 border-red-600 rounded-[2vh]"
                  onClick={()=>{deleteHandler(user.id)}}
                >Delete</button>
              </div>
            )
          })
        ) : (<h1 className="text-[2vh] font-bold text-center w-[96vw]">No User yet</h1>)}
      </div>
    </>
  )
}

export default App