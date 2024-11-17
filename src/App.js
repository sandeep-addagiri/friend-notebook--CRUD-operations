import React, { useState, useEffect } from 'react';
import './App.css';
import FriendForm from './FriendForm';
import FriendList from './FriendList';

const App = () => {
  const [friends, setFriends] = useState([]);
  const [editingFriend, setEditingFriend] = useState(null);

  useEffect(() => {
    const storedFriends = JSON.parse(localStorage.getItem('friends'));
    if (storedFriends) {
      setFriends(storedFriends);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('friends', JSON.stringify(friends));
  }, [friends]);

  const handleAddFriend = (newFriend) => {
    if (editingFriend) {
      const updatedFriends = friends.map((friend) =>
        friend.id === editingFriend.id ? newFriend : friend
      );
      setFriends(updatedFriends);
      setEditingFriend(null);
    } else {
      setFriends([...friends, newFriend]);
    }
  };

  const handleEditFriend = (friendToEdit) => {
    setEditingFriend(friendToEdit);
  };

  const handleDeleteFriend = (id) => {
    const updatedFriends = friends.filter((friend) => friend.id !== id);
    setFriends(updatedFriends);
  };

  return (
    <div className="App">
      <h1>Friend Notebook</h1>
      <FriendForm onAddFriend={handleAddFriend} editingFriend={editingFriend} />
      <FriendList
        friends={friends}
        onEditFriend={handleEditFriend}
        onDeleteFriend={handleDeleteFriend}
      />
    </div>
  );
};

export default App;
