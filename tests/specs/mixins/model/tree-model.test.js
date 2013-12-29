
define(function(require){
    var Backbone = require('backbone');
    var treeModelMixin = require('core/mixins/model/tree-model');

describe('Модель должна', function(){
    var tree, n1,n2,n3,n4, Node;

    beforeEach(function(){
        Node = Backbone.Model.extend(_.extend({

        },treeModelMixin));

        var Tree = Backbone.Collection.extend({
            model: Node 
        });

        tree = new  Tree([{
            name: 'name1',
            parentName: 'root'
        },{
            name: 'name2',
            parentName: 'name1'
        },{
            name: 'name3',
            parentName: 'name2'
        },{
            name: 'name4',
            parentName: 'name2'
        }]);
    
        n4 = tree.findWhere({name: 'name4'});
        n3 = tree.findWhere({name: 'name3'});
        n2 = tree.findWhere({name: 'name2'});
        n1 = tree.findWhere({name: 'name1'});
    
    });

    it('при добавлении дочерней модели, устанавливать в ней ссылку на себя', function(){
        var children = new Node();
        n1.addChildren(children);
        
        children.get('parentName').should.to.be.equal('name1'); 
    });

    it('находить "коренную" модель', function(){
        var n3Root = n3.getRoot();
        var n2Root = n2.getRoot();
        var n1Root = n1.getRoot();

        n3Root.get('name').should.to.be.equal('name1');
        n2Root.get('name').should.to.be.equal('name1');
        n1Root.get('name').should.to.be.equal('name1');
    });

    it('находить "родительскую" модель', function(){
        var n3Parent = n3.getParent();
        var n2Parent = n2.getParent();
        var n1Parent = n1.getParent();

        n3Parent.get('name').should.to.be.equal('name2');
        n2Parent.get('name').should.to.be.equal('name1');
        should.not.exist(n1Parent);
    });

    it('проверять является ли она "коренной"', function(){
        n3.isRoot().should.to.be.false;
        n2.isRoot().should.to.be.false;
        n1.isRoot().should.to.be.true;
    });

    it('возвращать список дочерних моделей', function(){
        var n1Childrens = n1.getChildrens();
        var n2Childrens = n2.getChildrens();
        var n3Childrens = n3.getChildrens();

        n1Childrens.should.to.be.an('array');
        n1Childrens.should.to.have.length(1);

        n2Childrens.should.to.be.an('array');
        n2Childrens.should.to.have.length(2);

        n3Childrens.should.to.be.an('array');
        n3Childrens.should.to.have.length(0);
    });

    it('находить "хлебные крошки"', function(){
        var breadcrumbs = n3.getPatch();
        
        breadcrumbs.should.to.be.an('array');
        breadcrumbs.should.to.have.length(3);
        breadcrumbs[0].should.to.be.equal(n1);
        breadcrumbs[1].should.to.be.equal(n2);
        breadcrumbs[2].should.to.be.equal(n3);
    });

    it('при конвертации в "json" должна возвращать "дерево"', function(){
        var json = n1.toJSON();

        json.should.to.be.eql({
            name: 'name1',
            parentName: 'root',
            childrens: [
                {
                    name: 'name2',
                    parentName: 'name1',
                    childrens: [
                        {
                            name: 'name3',
                            parentName: 'name2',
                            childrens: []
                        },
                        {
                            name: 'name4',
                            parentName: 'name2',
                            childrens: []
                        }
                    ]
                } 
            ]
        });
    });

});

});
