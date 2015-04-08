var ChatListView = Backbone.View.extend({
	el: '#chat',
	template: _.template($('#chat-view').html()),
	initialize : function () {
		var self = this;

		this.listenTo(this.model, 'all', this.render);
		this.model.add({nickname: 'lena23n', msg: 'hi'});

		vent.on('send', function (item){
			self.addMessage(item);
		});
	},
	render : function () {
		if(!this.template) {
			return false;
		}
		var data = null, html;

		if(this.model) {
			data = this.model.toJSON();
		}

		html = this.template({model: data});

		this.$el.html(html);
		return this;
	},
	addMessage : function (item) {
		this.model.add(item);
	}
});