window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];
	const nameInput = document.querySelector('#name');
	const newPlanForm = document.querySelector('#new-plan-form');

	const username = localStorage.getItem('username') || '';

	nameInput.value = username;

	nameInput.addEventListener('change', e => {
		localStorage.setItem('username', e.target.value);
	})
    newPlanForm.addEventListener('submit', e => {
		e.preventDefault();

		const todo = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			done: false,
			createdAt: new Date().getTime()
		}

        todos.push(todo);

		localStorage.setItem('todos', JSON.stringify(todos));

		e.target.reset();

		DisplayTodos();
    })
    DisplayTodos();
})
function DisplayTodos () {
	const myPlans = document.querySelector('#my-plans');
	myPlans.innerHTML = '';

	todos.forEach(todo => {
		const plan1 = document.createElement('div');
		plan1.classList.add('plan-1');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

        input.type = 'checkbox';
		input.checked = todo.done;
		span.classList.add('bubble');
		if (todo.category == 'things') {
			span.classList.add('things');
		} 
        else {
			span.classList.add('places');
		}
		content.classList.add('plan-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

        label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		plan1.appendChild(label);
		plan1.appendChild(content);
		plan1.appendChild(actions);

		myPlans.appendChild(plan1);

		if (todo.done) {
            plan1.classList.add('done');
		  }
		
		input.addEventListener('click', (e) => {
		 	todo.done = e.target.checked;
		 	localStorage.setItem('todos', JSON.stringify(todos));

		 	if (todo.done) {
                plan1.classList.add('done');
		 	} 
            else {
                plan1.classList.remove('done');
		 	}

		 	DisplayTodos();
        })

        edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				todo.content = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()

			})
		})

		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})

    })
}
