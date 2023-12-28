document.addEventListener('DOMContentLoaded', () => {

    let userPhoneNumber = document.getElementById('userPhone').innerText; // jenu acc ano number
    let opponentPhone ; // opponent phone
    let noChatDiv = document.getElementById('nochatselecteddiv'); // initial start no chat message
    let chatMainDiv = document.getElementById('insidemainchat'); // mainchat div with heading chat input
    let chatPersonIcon = document.getElementById('chatWithPersonIcon'); // opponent info icon
    let chatPersonName = document.getElementById('chatWithPersonName'); // opponent info person name
    let chatmainpartDiv = document.getElementById('chatmainpart'); // inside main only chat data
    let chatMsgInputBox = document.getElementById('chatMsgInput'); // input for send message
    let chatMsgSendIconBox = document.getElementById('chatMsgSendIcon'); // inputdata send Icon

    let playBeep = () => {
        var beep = new Audio();
        beep.src = '../Sounds/beep1.mp3';
        beep.play();
    }

    // ---------------------------------------------------------------------------------
    // js for set header that whome is opponent
    window.chatWith = (chatWithFLetter, chatWithName, chatWithPhone) => {
        document.getElementById('opponentPhone').innerText = chatWithPhone;
        opponentPhone = chatWithPhone;
        noChatDiv.style.display = 'none';
        chatMainDiv.style.display = 'block';

        chatPersonIcon.className = '';
        chatPersonIcon.classList.add('person-icon');
        chatPersonIcon.classList.add(chatWithFLetter);
        chatPersonIcon.innerText = chatWithFLetter;

        chatPersonName.innerText = chatWithName;
    }

        // ---------------------------------------------------------------------------------
    // display chat data in formate
    let chatDataUI = (ChatingData) => {
        if (ChatingData && ChatingData.length > 0) {
            chatmainpartDiv.innerHTML = '';
            for (const message of ChatingData){
                // message main div
                messageElementMain = document.createElement('div');
                messageElementMain.classList.add('msg')

                // inside message main div checkbox div
                messageElementCheckbox = document.createElement('div');
                checkboxElement = document.createElement('input');
                checkboxElement.type = 'checkbox';
                checkboxElement.className = 'msg-checkbox';
                checkboxElement.value = message.msgId;

                // inside message main div message div
                messageElementMessage = document.createElement('div');
                messageElementMessage.classList.add('msg-text');
                messageElementMessage.innerHTML = message.msg;

                if (userPhoneNumber == message.from) { messageElementMain.classList.add('right'); }
                else { messageElementMain.classList.add('left'); }
                
                // append div in chat
                messageElementCheckbox.appendChild(checkboxElement);
                messageElementMain.appendChild(messageElementCheckbox);
                messageElementMain.appendChild(messageElementMessage);
                chatmainpartDiv.appendChild(messageElementMain);
            }
        }
        else{
            chatmainpartDiv.innerHTML = 'No chat available.';
        }
        // scroll chat code start
            var chatmainpart = document.getElementById('chatmainpart');
            chatmainpart.scrollTo(0, chatmainpart.scrollHeight);
        // scroll chat code end
    }


    // ---------------------------------------------------------------------------------
    // js for send data on server for chat data
    window.sendDataOnServer = async (chatWithPhone) => {
        try
        {
            let dataToSend = {
                userPhoneNumber: userPhoneNumber,
                chatWithPhone: chatWithPhone
            }
            const response = await fetch('/get-chat-message-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            })
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            chatDataUI(data.showUserWiseChatData);
        }
        catch (error)
        {
            console.error('Error sending data to the server:', error);
        }
    }

    // ---------------------------------------------------------------------------------
    // chat message data send on server side code start
    let sendDataOnDb = async () => {
        let chatMsg = chatMsgInputBox.value;
        chatMsgInputBox.value = "";
        try
        {
            let dataToSendServer = {
                msgId : Date.now().toString(),
                from : userPhoneNumber,
                to : opponentPhone,
                msg : chatMsg,
                date : new Date().toLocaleString('en-US', { hour12: false })
            };
            const response = await fetch('/send-chat-message-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSendServer)
            })
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            chatDataUI(data.showUserWiseChatData);
        }
        catch (error)
        {
            console.error('Error sending data on the server:', error);
        }
    }
    // chat message data send on server side code end

    chatMsgSendIconBox.addEventListener('click', () => { sendDataOnDb(); })



















// --------------------------------------------------------------------------------
// delete one side all chate code start
var deleteAllChatElement = document.getElementById('clearAllchatMenu'); // menu for clear all chat

let AllChatDel = async (UserPhone, OpponentPhone) => {
    try
        {
            let dataToSend = {
                from: UserPhone,
                to: OpponentPhone
            }
            const response = await fetch('/delete-one-side-all-chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            })
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            chatDataUI(data.showUserWiseChatData);
        }
        catch (error)
        {
            console.error('Error sending data to the server:', error);
        }
}

deleteAllChatElement.addEventListener('click', () => {
    var UserPhone = document.getElementById('userPhone').innerText; // get user phone number
    var OpponentPhone = document.getElementById('opponentPhone').innerText; // get opponent phone number
    Swal.fire({
        title: "Delete All chat?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                AllChatDel(UserPhone, OpponentPhone);
                Swal.fire({
                title: "Deleted!",
                text: "All chat are deleted.",
                icon: "success"
                });
            }
    });
});
// delete one side all chate code end

// --------------------------------------------------------------------------------
// delete selected message js code start
let GivenIdChatDel = async (msgIds, UserPhone, OpponentPhone) => {
    try
        {
            let dataToSend = {
                msgIds: msgIds,
                from: UserPhone,
                to: OpponentPhone
            }
            const response = await fetch('/delete-selected-id-chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            })
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            chatDataUI(data.showUserWiseChatData);
        }
        catch (error)
        {
            console.error('Error sending data to the server:', error);
        }
}

let SelectedItomDeleteIcon = document.getElementById('deleteIcon');
var checkboxes = document.getElementsByClassName('msg-checkbox');

SelectedItomDeleteIcon.addEventListener('click', () => {
    var UserPhone = document.getElementById('userPhone').innerText; // get user phone number
    var OpponentPhone = document.getElementById('opponentPhone').innerText; // get opponent phone number

    var selectedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);
      if(selectedCheckboxes.length > 0){
        var msgIds = selectedCheckboxes.map(checkbox => checkbox.value);
          Swal.fire({
              title: "Delete All chat?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!"
            }).then((result) => {
              if (result.isConfirmed) {
                GivenIdChatDel(msgIds, UserPhone, OpponentPhone);
                Swal.fire({
                  title: "Deleted!",
                  text: "Selected chat are deleted.",
                  icon: "success"
                });
              }
            });
      }
      else{
          Swal.fire({
              title: "No Chats Selected",
              text: "Please select at least one chat to delete.",
              icon: "info"
            });
      }
})
// delete selected message js code end

});