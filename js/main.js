document.querySelector('#shoot').addEventListener('click', makeReq)

async function makeReq(){
  const userChoice = document.querySelector("#choice").value;
  const res = await fetch(`/api?choice=${userChoice}`)
  const data = await res.json()
  document.querySelector("#serverChoice").textContent = 'Server threw: ' + data.serverThrew
  document.querySelector("#gameResults").textContent =  data.outcome
}