$(document).ready(function(){
	let kor=0, math=0, eng=0, total=0, avg=0;
	const valLength = $('td.val').length;
	$('td.val').each(function(index){
		const thisClass = $(this).attr('class').slice(0,-4),
			thisVal = $(this).text();
		if(thisClass == 'kor'){
			kor += thisVal*1;
		}
		if(thisClass == 'math'){
			math += thisVal*1;
		}
		if(thisClass == 'eng'){
			eng += thisVal*1;
		}
		if(thisClass == 'total'){
			total += thisVal*1;
		}
		if(thisClass == 'avg'){
			avg += thisVal*1;
		}
		if(index == valLength - 1){
			$('#tKor').text(mathRound(kor,valLength/5));
			$('#tMath').text(mathRound(math,valLength/5));
			$('#tEng').text(mathRound(eng,valLength/5));
			$('#tTotal').text(mathRound(total,valLength/5));
			$('#tAvg').text(mathRound(avg,valLength/5));
		}
	});
	$('tr.tList').click(function(){
		$.post('/json',{id:$(this).attr('id')},function(r){
			$('#id').val(r.item._id);
			$('#intNum').val(r.item.intNum);
			$('#strName').val(r.item.strName);
			$('#intKor').val(r.item.intKor);
			$('#intMath').val(r.item.intMath);
			$('#intEng').val(r.item.intEng);
			$('#intTotal').val(r.intTotal);
			$('#intAvg').val(r.intAvg);
			$('.hide-btn').removeClass('w3-hide');
		});
	});
});
function mathRound(int,length){
	return (Math.round(int/length*1000))/1000
}
