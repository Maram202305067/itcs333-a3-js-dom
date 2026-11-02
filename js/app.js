// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here
(() => {
    const form = document.querySelector("#todo-form");
    const input = document.querySelector("#todo-input");
    const errorMsg = document.querySelector("#error-msg");
    const todoList = document.querySelector("#todo-list");
    const counter = document.querySelector("#counter");

    const filterAll = document.querySelector("#filter-all");
    const filterActive = document.querySelector("#filter-active");
    const filterDone = document.querySelector("#filter-done");

    let currentFilter = "all";

    // Update the counter
    function updateCounter() {
        const items = todoList.querySelectorAll("li");
        const remaining = Array.from(items).filter(
            item => !item.classList.contains("completed")
        ).length;

        counter.textContent = `${remaining} items left`;
    }

    // Apply the selected filter
    function applyFilter() {
        const items = todoList.querySelectorAll("li");

        items.forEach(item => {
            const isCompleted = item.classList.contains("completed");

            if (currentFilter === "all") {
                item.hidden = false;
            } else if (currentFilter === "active") {
                item.hidden = isCompleted;
            } else if (currentFilter === "done") {
                item.hidden = !isCompleted;
            }
        });
    }

    // Add a new task
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const taskText = input.value.trim();

        if (taskText === "") {
            errorMsg.classList.remove("hidden");
            return;
        }

        errorMsg.classList.add("hidden");

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = taskText;

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";

        li.appendChild(span);
        li.appendChild(deleteBtn);

        todoList.appendChild(li);

        input.value = "";
        input.focus();

        applyFilter();
        updateCounter();
    });

    // Event delegation for completing and deleting tasks
    todoList.addEventListener("click", function(event) {
        const deleteBtn = event.target.closest(".delete-btn");

        if (deleteBtn) {
            deleteBtn.closest("li").remove();
        } else {
            const li = event.target.closest("li");

            if (li && todoList.contains(li)) {
                li.classList.toggle("completed");
            }
        }

        applyFilter();
        updateCounter();
    });

    // Filter buttons
    filterAll.addEventListener("click", function() {
        currentFilter = "all";
        applyFilter();
    });

    filterActive.addEventListener("click", function() {
        currentFilter = "active";
        applyFilter();
    });

    filterDone.addEventListener("click", function() {
        currentFilter = "done";
        applyFilter();
    });

    updateCounter();
})();
