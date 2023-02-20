let myLeads = [];
let textEl = document.getElementById("text-el");
let inputBtn = document.getElementById("input-btn");
let ulEl = document.getElementById("ul-el");
let deleteBtn = document.getElementById('delete-btn');
let saveTab = document.getElementById('save-btn');
const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads)
}

function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems += `
      <li><a target='_blank' href='"  ${leads[i]} "'>${leads[i]}</a></li>`;
    }
    ulEl.innerHTML = listItems;
}


saveTab.addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem('myLeads', JSON.stringify(myLeads))
        render(myLeads)
    })


})


deleteBtn.addEventListener('dblclick', function() {
    let clearLocalStorage = confirm('Do you want to clear the local storage??')
        if (clearLocalStorage === true) {
            confirm('localStorage has been cleared successfuly!!!');
            localStorage.clear();
            myLeads = [];
            render(myLeads);   
        } else {
            confirm('The action has been aborted!!')
        }
})

inputBtn.addEventListener("click", function() {
    myLeads.push(textEl.value);
    textEl.value = "";
    localStorage.setItem('myLeads', JSON.stringify(myLeads))

    render(myLeads);
    console.log(localStorage.getItem('myLeads'))
});

