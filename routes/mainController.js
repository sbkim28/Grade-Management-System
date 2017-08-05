module.exports = (app,gradeDTO)=>{
	app.get('/',(req,res)=>{
		res.render('index');
	});
	app.post('/insert',(req,res,next)=>{
		const _dto = new gradeDTO(req.body);
		_dto.save((err)=>{
			if(err) return next(err);
			res.json({success:true});
		});
	});
	app.get('/list',(req,res,next)=>{
		gradeDTO.find({}).sort({intNum:1}).exec((err,data)=>{
			if(err) return next(err);
			res.render('list_view',{list:data});
		});
	});
	app.post('/json',(req,res,next)=>{
		gradeDTO.findById(req.body.id,(err,item)=>{
			if(err) return next(err);
			if(!item) return next(new Error('Cannot find Data'));
			res.json({item,intTotal:item.getTotal(),intAvg:item.getAvg()});
		});
	});
	app.post('/delete',(req,res,next)=>{
		gradeDTO.remove({_id:req.body.id},(err)=>{
			if(err) return next(err);
			res.json({success:true});
		});
	});
	app.post('/update',(req,res,next)=>{
		gradeDTO.update({_id:req.body.id},{$set:req.body},(err)=>{
			if(err) return next(err);
			res.json({success:true});
		});
	});
};