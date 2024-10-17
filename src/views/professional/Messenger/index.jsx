import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import axios from 'axios';
import Chat from '../../../components/Chat';
import { convertToTimeAgo, truncate } from '../../../utils/helper';

const ProfessionalMessages = () => {
  const [chatUsers, setChatUsers] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchChatUsers = async () => {
    axios
      .get('https://api.mddentalstaffing.com/api/v1/chat-users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      })
      .then((response) => {
        setChatUsers(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchChatUsers();
  }, []);



  const getConversation = async (user_id) => {
    const response = await axios.get(
      `https://api.mddentalstaffing.com/api/v1/conversations?user_id=${user_id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      }
    );

    return response.data;
  };

  const getConvo = async (user_id) => {
    const convo = await getConversation(user_id);
    return {
      ...convo.data,
      unread_count: 0,
      latest_message: {
        message: '',
        updated_at: '',
      },
    };
  };

  const getUsersWithConversations = async () => {
    const users = await Promise.all(
      chatUsers?.map(async (user) => {
        let conversation;
        let participants = user.participants;

        if (user.participants.length === 0) {
          conversation = await getConvo(user.id);
          participants.push({
            conversation: conversation,
            conversation_id: conversation.id,
            user_id: user.id,
          });
        } else {
          conversation = user.participants[0].conversation;
          participants = user.participants;
        }

        const lastMessage = conversation?.latest_message?.message;
        const lastMessageTime = conversation?.latest_message?.updated_at;

        return {
          id: user.id,
          name: `${user.first_name} ${user.last_name}`,
          avatar: `https://api.mddentalstaffing.com/api/v1/assets/${user.avatar}`,
          status: user.is_online,
          lastMessage: lastMessage ? truncate(lastMessage, 20) : '',
          time: lastMessageTime ? convertToTimeAgo(lastMessageTime) : '',
          unread: conversation?.unread_count,
          ...user,
        };
      })
    );

    setUsers(users);
  };

  useEffect(() => {
    getUsersWithConversations();
  }, [chatUsers]);

  // console.log(users);

  // const users = chatUsers.map((user) => {
  //   return {
  //     id: user.id,
  //     name: `${user.first_name} ${user.last_name}`,
  //     avatar: `https://api.mddentalstaffing.com/api/v1/assets/${user.avatar}`,
  //     status: user.is_online,
  //     lastMessage: truncate(
  //       user.participants[0]?.conversation?.latest_message?.message,
  //       25
  //     ),
  //     time: convertToTimeAgo(
  //       user.participants[0]?.conversation?.latest_message?.updated_at
  //     ),
  //     unread: user.participants[0].conversation.unread_count,
  //     ...user,
  //   };
  // });

  return (
    <Layout>
      <Chat chatUsers={users} />
    </Layout>
  );
};

export default ProfessionalMessages;
