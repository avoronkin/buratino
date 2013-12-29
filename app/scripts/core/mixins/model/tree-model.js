define(function(require){

    var treeModelMixin = {
        nodeId: 'name',
        nodeParentId: 'parentName',

        addChildren: function (model) {
            model.set(this.nodeParentId, this.get(this.nodeId));
            this.collection.add(model);
        },

        isRoot: function(){
            return this.getParent() === undefined;
        },

        getRoot: function () {
            var parent = this.getParent();

            return parent ? parent.getRoot() : this;
        },

        getParent: function () {
            var parent,
                parentId = this.get(this.nodeParentId),
                whereClause = {};


            if (parentId) {
                whereClause[this.nodeId] = parentId;

                parent = this.collection.findWhere(whereClause);
            }

            return parent;
        },

        getChildrens: function () {
            var whereClause = {};

            whereClause[this.nodeParentId] = this.get(this.nodeId);

            return this.collection.where(whereClause);
        },

        getPatch: function (models) {
            models = models || [];

            models.unshift(this);

            return this.isRoot() ? models : this.getParent().getPatch(models);
        },

        toJSON: function () {
            var node = _.clone(this.attributes),
                childrens = this.getChildrens();

            node.childrens = _.invoke(childrens,'toJSON');

            return node;
        }

    };

    return treeModelMixin;
});
