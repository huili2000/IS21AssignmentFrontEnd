import React, { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    width: 400,
  },
};

function AdminModal(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("name");
  const [permission, setPermission] = useState("permission")

  function handleClose() {
    setModalOpen(false);
    let user = { name: name, permission: permission }
    props.setUser(user);
  }


  return (
    <div className="App">
      <button onClick={setModalOpen}>Open Modal</button>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={customStyles}
      >
        <div className={"inputContainer"}>
          <input
            value={name}
            placeholder="Enter your name"
            onChange={ev => setName(ev.target.value)}
            className={"inputBox"} />
          <input
            value={permission}
            placeholder="Enter your permission to be updated"
            onChange={ev => setPermission(ev.target.value)}
            className={"inputBox"} />
        </div>

        /**<button onClick={() => setModalOpen(false)}>Close Modal</button>*/
        <button onClick={handleClose}>Close Modal</button>
      </Modal>
    </div>
  );
}

export default AdminModal;

