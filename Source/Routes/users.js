const express = require("express");
const routes = express.Router();
const {
    insertOneUser,
    deleteOneUser,
    showLoginUser,
    showAllUser
} = require('../Models/users')
const {
    insertOneChat,
    insertManyChat,
    deleteOneChat,
    deleteOneSideChat,
    deleteManyChatWithId,
    //deleteAllChat,
    showMixChat,
    showUserWiseChat
} = require('../Models/chats')

routes.get('/', async (req, res) => {
    // if(req.session.userPhone){
      // let userPhone = req.session.userPhone;
      let userPhone = "7600939641";
      // try {
        const UserProfile = await showLoginUser(userPhone);
        const chatMembers = await showAllUser(userPhone);
        res.render('home', { chatMember: chatMembers, UserProfile: UserProfile });
      // } catch (error) {
        // res.status(500).send('Internal Server Error');
      // }
    // }
    // else{
      // res.status(500).send('Login Require')
    // }
});

routes.post('/get-chat-message-data', async (req, res) => {
  let { userPhoneNumber, chatWithPhone } = await req.body;
  let showUserWiseChatData = await showUserWiseChat(userPhoneNumber, chatWithPhone);
  
  res.json({showUserWiseChatData});
});

routes.post('/send-chat-message-data', async (req, res) => {
  let dataToSendServer = await req.body;
  await insertOneChat(dataToSendServer);

  // display data
  let to = dataToSendServer.to;
  let from = dataToSendServer.from;
  let showUserWiseChatData = await showUserWiseChat(to, from);
  
  res.json({showUserWiseChatData});
})

routes.post('/delete-one-side-all-chat', async (req, res) => {
  let { from, to } = req.body;
  const filters = [ { from: from, to: to } ];
  await deleteOneSideChat(filters);
  
  let showUserWiseChatData = await showUserWiseChat(to, from);
  res.json({showUserWiseChatData});
});

routes.post('/delete-selected-id-chat', async (req, res) => {
  let { msgIds, from, to } = req.body;
  const filters = msgIds.map(msgId => ({ msgId }));
  await deleteManyChatWithId(filters);

  let showUserWiseChatData = await showUserWiseChat(from, to);
  res.json({showUserWiseChatData});
});

routes.get('/login', (req, res) => {
    // req.session.userPhone = "7048308961";
    // req.session.userPhone = "8690914276";
    req.session.userPhone = "9081264042";
    res.send("login")
  })

module.exports = routes;