const hasNewMessage = () => {
  // TODO: return true with a probability of 20%.

let randomNumber = Math.random()

if (randomNumber <= 0.2) {
  console.log(true)
} else {
  console.log(false)
}

};

const sample = array => array[Math.floor(Math.random() * array.length)];
// TODO: return a random message as an object with two keys, subject and sender

const newMessage = () => {
let sender = ['Alex', 'Audrey', 'Denis']
let subject =['Welcome to Git Hub', 'Welcome to Le Wagon']

  return {
    sender: sample(sender),
    subject: sample(subject)
  }

};

const appendMessageToDom = (message) => {
// TODO: append the given message to the DOM (as a new row of `#inbox`)

  const newRow = `<div class="row message unread">
        <div class="col-3">${message.sender}</div>
        <div class="col-9">${message.subject}</div>
      </div>`;

  const inbox = document.querySelector("#inbox");
  inbox.insertAdjacentHTML('afterbegin', newRow);

};

const updateUnreadCounter = () => {
      const count = document.querySelectorAll(".unread").length;
      const counter = document.getElementsByTagName('count');
      counter.innerText=`(${count})`;
      const title = document.querySelector('title');
      title.innerText = `(${count}) - Fake Inbox`;
}

const refresh = () => {
  // TODO: Implement the global refresh logic. If there is a new message,
  //       append it to the DOM. Update the unread counter in title as well.


};


// Do not remove these lines:
document.addEventListener("DOMContentLoaded", () => {
  setInterval(refresh, 1000); // Every 1 second, the `refresh` function is called.
});



