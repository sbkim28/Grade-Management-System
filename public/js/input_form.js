$(document).ready(function(){
	listView();
	$('input').addClass('w3-input w3-border w3-round w3-hover-light-gray');
	valueReset();
	$('input').blur(function(){
		const object = {
			element:$(this),
			val:$(this).val(),
			error:$('.'+$(this).attr('id')+'-Error')
		};
		const range = setRange(object);
		if(lengthConfirm(object)==true&&valueConfirm(object,range.min,range.max)==true){
			confirmTrue(object);
			setTotalAvg();
			return false;
		}
		object.element.val('');
		return false;
	});
	$('button').click(function(){
		const thisId = $(this).attr('id');
		if(thisId=='saveBtn'){
			save();
		}
		if(thisId=='newBtn'){
			if(confirm('Are you sure to cancel updating data?')){
				valueReset();
				removeBorderColor();
				$('.hide-btn').addClass('w3-hide');
			}
		}
		if(thisId=='deleteBtn'){
			if(confirm('Are you sure to delete this data?')){
				$.post('/delete',{id:$('#id').val()},function(r){
					if(r.success){
						alert('Successfully Removed');
						valueReset();
						removeBorderColor();
						$('.hide-btn').addClass('w3-hide');
						listView();
					}
				});
			}
		}
	});
});
function removeBorderColor(element){
	$('input').removeClass('w3-border-green w3-border-red');
}
function save(){
	$('input[type!=\'hidden\']').each(function(index){
		const object = {
			element:$(this),
			val:$(this).val(),
			error:$('.'+$(this).attr('id')+'-Error')
		};
		const range = setRange(object);
		if(lengthConfirm(object)==false){
			alert('Enter Value');
			alert(object.element.attr('id'));
			return false;
		}
		if(valueConfirm(object,range.min,range.max)==false){
			alert('Value Out of Range');
			return false;
		}
		if(index == $('input[type!=\'hidden\']').length-1){
			$('input[type=\'hidden\']').val() 
			? $.post('/update',$('input').serialize(),function(r){
				if(r.success){
					alert('Successfully Updated');
					valueReset();
					removeBorderColor();
					listView();
				}else{
					alert('Error Occured. Try again');
				}
			})
			: $.post('/insert',$('input').serialize(),function(r){
				if(r.success){
					alert('Successfully Saved');
					valueReset();
					removeBorderColor();
					listView();
				}else{
					alert('Error Occured. Try again');
				}
			});
		}
	});
}
function valueReset(){
	$('input').val('');
	$('#intTotal').val('0');
	$('#intAvg').val('0');
}
function listView(){
	$.get('/list',function(r){
		$('#list_view').html(r);
	});
}
function setRange(object){
	let min,max;
	switch(object.element.attr('id')){
	case 'intNum' : min = 1, max = null; break;
	case 'intKor' : min = 0, max = 100; break;
	case 'intMath' : min = 0, max = 100; break;
	case 'intEng' : min = 0, max = 100; break;
	default : min = null, max = null; break;
	}
	const range = {
		min : min,
		max : max
	};
	return range;
}
function setTotalAvg(){
	const _total = $('#intKor').val()*1+$('#intMath').val()*1+$('#intEng').val()*1;
	$('#intTotal').val(_total);
	const _avg = (Math.round(_total/3*1000))/1000;
	$('#intAvg').val(_avg);
}
function confirmTrue(object){
	setBorderColor(object.element,false);
	object.error.text('');
}
function lengthConfirm(object){
	if(object.val.length == 0){
		setBorderColor(object.element,true);
		object.error.text('Enter Value');
		return false;
	}
	return true;
}
function valueConfirm(object,min,max){
	if(object.val.length == 0){
		return false;
	}
	const minError = object.val < min&&min!=null ? 'Value must be greater than or equal to '+min:null,
		maxError = object.val > max&&max!=null ? 'Value must be less than or equal to '+max:null;
	if(minError||maxError){
		setBorderColor(object.element,true);
		object.error.text( minError ? minError : maxError);
		return false;
	}
	return true;
}
function setBorderColor(element,isRed){
	const removeSelector = isRed ? 'w3-border-green' : 'w3-border-red',
		addSelector = isRed ? 'w3-border-red' : 'w3-border-green';
	element.removeClass(removeSelector);
	element.addClass(addSelector);
}