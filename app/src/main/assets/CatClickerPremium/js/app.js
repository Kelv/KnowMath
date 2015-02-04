init = function(){

	/*======Model========*/
	var model = {
		//The model of the cat data
		currentCat: 0,
		cats: [
			{name: "Jinny", clickC: 0, src: "images/Jinny.png"},
			{name: "Kitty", clickC: 0, src: "images/Kitty.jpeg"},
			{name: "Michi", clickC: 0, src: "images/Michi.jpg"},
			{name: "Sammy", clickC: 0, src: "images/Sammy.jpg"},
			{name: "Tom", clickC: 0, src: "images/Tom.jpg"}
		]
	};

	/*======Octopus======*/
	var octopus = {
		init: function(){
			listView.init();
			imgView.init();
			adminView.init();
		},

		getCurrentCat: function(){
			return model.cats[model.currentCat];
		},

		getCatsNames: function(){
			var names = [];
			for(var i = 0; i < model.cats.length; i++){
				names.push(model.cats[i].name);
			}
			return names;
		},

		changeCat: function(num){
			model.currentCat = num;
			imgView.render();
		},

		increment: function(){
			imgView.setListener();
			model.cats[model.currentCat].clickC += 1;
			imgView.render();
		},
		updateCat: function(n, s, c){
			var currentCat = this.getCurrentCat();
			currentCat.name = n;
			currentCat.src = s;
			currentCat.clickC = +c;
			listView.render();
			imgView.render();
		}

	};

	/*========View=======*/
	var listView = {
		//Generates a list of cats to be selected and their proper events
		init: function(){
			this.list = document.getElementById("listing");
			var names = octopus.getCatsNames();
			this.render();
		},

		render: function(){
			var names = octopus.getCatsNames();
			this.list.innerHTML = '';
			for(var i = 0; i < names.length; i++){
				var e = document.createElement('li');
				e.setAttribute('id', names[i]);
				e.innerHTML = names[i];
				e.addEventListener('click', (function(catnum){
					return function(){
						octopus.changeCat(catnum);
					}})(i))
				this.list.appendChild(e);
			}	
		}
	};


	var imgView = {
		//The cats View
		init: function(){
			this.name = document.getElementById("catName");
			this.image = document.getElementById("im");
			this.counter = document.getElementById("count");

			this.render();
		},

		render: function(){
			var currentCat = octopus.getCurrentCat();

			this.name.innerHTML = currentCat.name;
			this.image.src = currentCat.src;
			this.counter.innerHTML = currentCat.clickC;
			imgView.setListener();
		},

		setListener: function(){
			var image = document.getElementById("im");
			image.addEventListener('click', octopus.increment);
		}
	};

	var adminView = {
		init: function(){
			var admin = document.getElementById('admin');
			var cancel = document.getElementById('cancel');
			var save = document.getElementById('save');
			var name = document.getElementById('newName');
			var src = document.getElementById('newUrl');
			var clicks = document.getElementById('newClicks');

			admin.addEventListener('click', function(){
				document.getElementById('addcat').style.display = 'inline-block';
				var currentCat = octopus.getCurrentCat();
				name.value = currentCat.name;
				src.value = currentCat.src;
				clicks.value = currentCat.clickC;
			});
			
			cancel.addEventListener('click', function(){
				document.getElementById('addcat').style.display = 'none';
			});

			save.addEventListener('click', function(){
				octopus.updateCat(name.value, src.value, clicks.value);
				document.getElementById('addcat').style.display = 'none';
			});
		}
	};

	octopus.init();
};