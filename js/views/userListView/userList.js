var UserListView = Backbone.View.extend({
	el: '#chat-info',
	template: _.template($('#form-view').html()),
	events : {
		"click .send":  "send",
		"click #add-user" : "addUser",
		"click .delete" : "deleteUser",
		"click .save-user" : "saveUser"
	},
	inputs : {
		nickname: null,
		color: null,
		message: null
	},
	initialize : function () {
		this.listenTo(this.model, 'all', this.render);
		this.model.add({nickname: 'Lenko'});
	},
	render : function () {
		if(!this.template) {
			return false;
		}

		var data, html;

		if(this.model) {
			data = this.model.toJSON();
		}

		html = this.template({model: data});

		this.$el.html(html);
	},
	getFormIndex : function (e) {
		var idx = $(e.currentTarget).closest('.form').index();
		return idx;
	},
	addUser : function () {
		this.model.add({});
	},
	deleteUser : function (e) {
		var formIndex = this.getFormIndex(e);

		this.model.at(formIndex).destroy();
	},
	checkNickSaved : function (idx) {
		var isNickSaved;

		isNickSaved = this.model.at(idx).toJSON().nickname;

		if(!isNickSaved) {
			return false;
		}
		//isNickSame = this.model.where({name: isNickSaved});
		//
		//isFieldNickCorrect = isNickSaved && (isNickSame.length == 0);
		return isNickSaved;
	},
	checkIsNickSame : function (nick) {
		//returns array of models with the same nickname
		var isNickSameArray, isNickSame;
		isNickSameArray = this.model.where({nickname: nick});

		if(isNickSameArray.length == 0) {
			isNickSame = false;
			return false
		}

		isNickSame = true;
		return isNickSame;
	},
	saveUser : function (e) {
		var formIndex, nickname,  isNickSame;
		formIndex = this.getFormIndex(e);

		this.inputs.nickname = $('.nick').eq(formIndex);

		nickname = this.inputs.nickname.val();
		isNickSame = this.checkIsNickSame(nickname);

		if(isNickSame) {
			alert('This nickname is already exist! Try another one');
			return false;
		}

		this.model.at(formIndex).set({
			nickname: nickname
		})
	},
	send : function (e) {
		var formIndex, isNickSaved;
		formIndex = this.getFormIndex(e);
		isNickSaved = this.checkNickSaved(formIndex);

		if(!isNickSaved) {
			alert('You should save your nickname');
			return false
		}

		this.inputs.nickname = this.model.at(formIndex).toJSON().nickname;
		this.inputs.message = $('.msg').eq(formIndex);
		this.inputs.color = $('.color').eq(formIndex);

		if(!this.inputs.nickname || !this.inputs.message.val()) {
			alert('Fill in all fields');
			return false;
		}

		vent.trigger('send', {
			nickname: this.inputs.nickname,
			msg: this.inputs.message.val(),
			color: this.inputs.color.val()
		});



		this.model.at(formIndex).set({
			color: this.inputs.color.val(),
			lastMessage: this.inputs.nickname
		});

		console.log(this.model);
		this.inputs.message.val('');
	}
});