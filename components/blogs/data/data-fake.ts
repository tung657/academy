import { researchTypeOptions } from '@/components/research/data/data-fake';

export const dataTypesBlogs = [
	...researchTypeOptions,
	{
		id: 10,
		label: 'Others',
	},
];

export const dataBlogs = [
	{
		id: 1,
		type: 1,
		title: 'Bốn nguyên tắc khi học code',
		author: 'Le Minh',
		avatar: '',
		thumbnail: '/api/file/' + btoa('2024-05-08/how-its-work.png'),
		meta_content: `Theo mentor FUNiX Cao Văn Việt, sinh viên nên thực hành nhiều, làm dự án, làm việc nhóm và nắm chắc một ngôn ngữ hơn là học nhiều...`,
		content: `<div><p>Theo mentor FUNiX Cao Văn Việt, sinh viên nên thực hành nhiều, làm dự án, làm việc nhóm và nắm chắc một ngôn ngữ hơn là học nhiều mà dàn trải.</p>
    <p>Những chia sẻ của mentor Cao Văn Việt về "Học code thế nào cho tốt " nằm trong khuôn khổ xDay - một hoạt động định kỳ dành cho sinh viên FUNiX nhằm tương tác, chia sẻ kiến thức với sinh viên.</p>
    <p>Với hơn 10 năm kinh nghiệm trong lĩnh vực IT, mentor FUNiX Cao Văn Việt - Product Owner của Codelearn cho biết, thị trường đang "khát" nhân lực thuộc lĩnh vực này, dự đoán con số lên tới 500.000 - 1.000.000 lao động. Diễn giả này nhấn mạnh ba điểm giúp sinh viên học code hiệu quả.</p>
    <p>Phẩm chất kiên nhẫn, ham học, khả năng tự học và tính cẩn thận</p>
    <p>Anh Việt không nhấn mạnh vào tố chất để trở thành lập trình viên bởi theo anh chỉ cần có đam mê, bất cứ ai cũng có thể làm được. Những bước khởi đầu với coder thường không dễ dàng khi làm quen với những con số, thuật toán khó, hãy kiên nhẫn học từng chút một, tích lũy đủ kiến thức và kinh nghiệm để tạo nên bước nhảy và đột phá với những dự án công nghệ hữu ích.</p>
    <p>Bên cạnh đó, công nghệ thông tin thay đổi liên tục, để cập nhật các tài liệu, xu thế, mới, học viên nên học ngoại ngữ và đọc tài liệu nước ngoài đón nhận công nghệ mới. Anh Việt nhấn mạnh trong code, chỉ cần một phút bất cẩn, quên vài thứ rất nhỏ có thể phá hỏng dự án. Trước khi chạy sản phẩm, hãy chắc rằng bạn đã kiểm tra chúng rất nhiều lần và gỡ các lỗi liên quan.ào.
    Bốn nguyên tắc khi học code</p>
    <ol>
    <li>
    <p>Thực hành nhiều tốt hơn chỉ học theo lý thuyết;</p>
    </li>
    <li>
    <p>Làm dự án tốt hơn chỉ luyện các đoạn mã ngắn, rời rạc;</p>
    </li>
    <li>
    <p>Làm theo nhóm, giữ tinh thần đồng đội hơn là chỉ làm một mình;</p>
    </li>
    <li>
    <p>Nắm vững, chắc một ngôn ngữ hơn là biết nhiều ngôn ngữ nhưng không vững một ngôn ngữ nào.</p>
    </li>
    </ol>
    <p>Mentor Việt tiết lộ, khi phỏng vấn ứng viên, các nhà tuyển dụng thường yêu cầu lập trình viên giới thiệu về các ứng dụng mình từng thực hiện trong thời gian học. Vì vậy, để học code hiệu quả bạn cần ưu tiên: học lý thuyết chắc - thực hành nhiều, thực hiện các dự án cùng đồng đội hơn là tự code các đoạn mã nhỏ. Đặc biệt, khi bắt đầu học code, không cần biết quá nhiều ngôn ngữ, hãy học chắc một ngôn ngữ, chú tâm vào thực hành, chọn dự án và thực hiện ứng dụng bằng ngôn ngữ đó, sau đó mở rộng ra các ngôn ngữ khác.</p>
    <p>"Muốn đi nhanh hãy đi một mình, muốn đi xa hãy đi cùng nhau, các lập trình viên phải thường xuyên trao đổi kiến thức và kinh nghiệm để hoàn thiện sản phẩm một cách tốt nhất", anh Việt chia sẻ.</p>
    <p>Kinh nghiệm học tốt code</p>
    <ol>
    <li>
    <p>Thực hành nhiều;</p>
    </li>
    <li>
    <p>Tự gỡ lỗi (logic);</p>
    </li>
    <li>
    <p>Làm dự án với những tính năng hoàn chỉnh;</p>
    </li>
    <li>
    <p>Code lại các sản phẩm;</p>
    </li>
    <li>
    <p>Đọc sách lập trình;</p>
    </li>
    <li>
    <p>Tìm hiểu và thảo luận.</p>
    </li>
    </ol>
    <p>Anh Việt cho biết, đã làm nghề 10 năm và giữ vị trí quản lý nhưng hơn 10 năm nay anh vẫn code hàng ngày. Thời đi học thường code ít nhất bốn tiếng một ngày cho đến khi ở cương vị quản lý doanh nghiệp, anh vẫn dành hai tiếng một ngày để code. Với anh, việc lập trình như bài tập thể dục giúp bản thân sảng khoái mỗi ngày.</p>
    <p>Để luyện tập và thực hành code, người học lập trình có thể làm nhiều cách như: gỡ lỗi các chương trình, code game, thực hiện dự án... Người học có thể tìm một số website để thường xuyên luyện tập như codelearn, hackerank.</p>
    <p>Mentor Cao Văn Việt là Product Owner của Codelearn (FPT Software), chuyên gia công nghệ cấp Tập đoàn FPT. Tại FUNiX, anh Việt là mentor các môn thuộc Chứng chỉ 1 (Công dân số) và Chứng chỉ 3 (Lập trình viên ứng dụng doanh nghiệp). Anh có nhiều chia sẻ thú vị dành riêng cho các bạn trẻ theo học ngành CNTT, như các kinh nghiệm phỏng vấn xin việc ngành công nghệ, kinh nghiệm lập trình...</p>
    </div>`,
		reading_time: Math.ceil(500 / 225),
		created_date: new Date('2023-04-04'),
	},
	{
		id: 2,
		type: 2,
		title: 'Bốn nguyên tắc khi học code',
		author: 'Le Minh',
		avatar: '',
		meta_content: `Theo mentor FUNiX Cao Văn Việt, sinh viên nên thực hành nhiều, làm dự án, làm việc nhóm và nắm chắc một ngôn ngữ hơn là học nhiều...`,
		content: `<div><p>Theo mentor FUNiX Cao Văn Việt, sinh viên nên thực hành nhiều, làm dự án, làm việc nhóm và nắm chắc một ngôn ngữ hơn là học nhiều mà dàn trải.</p>
    <p>Những chia sẻ của mentor Cao Văn Việt về "Học code thế nào cho tốt " nằm trong khuôn khổ xDay - một hoạt động định kỳ dành cho sinh viên FUNiX nhằm tương tác, chia sẻ kiến thức với sinh viên.</p>
    <p>Với hơn 10 năm kinh nghiệm trong lĩnh vực IT, mentor FUNiX Cao Văn Việt - Product Owner của Codelearn cho biết, thị trường đang "khát" nhân lực thuộc lĩnh vực này, dự đoán con số lên tới 500.000 - 1.000.000 lao động. Diễn giả này nhấn mạnh ba điểm giúp sinh viên học code hiệu quả.</p>
    <p>Phẩm chất kiên nhẫn, ham học, khả năng tự học và tính cẩn thận</p>
    <p>Anh Việt không nhấn mạnh vào tố chất để trở thành lập trình viên bởi theo anh chỉ cần có đam mê, bất cứ ai cũng có thể làm được. Những bước khởi đầu với coder thường không dễ dàng khi làm quen với những con số, thuật toán khó, hãy kiên nhẫn học từng chút một, tích lũy đủ kiến thức và kinh nghiệm để tạo nên bước nhảy và đột phá với những dự án công nghệ hữu ích.</p>
    <p>Bên cạnh đó, công nghệ thông tin thay đổi liên tục, để cập nhật các tài liệu, xu thế, mới, học viên nên học ngoại ngữ và đọc tài liệu nước ngoài đón nhận công nghệ mới. Anh Việt nhấn mạnh trong code, chỉ cần một phút bất cẩn, quên vài thứ rất nhỏ có thể phá hỏng dự án. Trước khi chạy sản phẩm, hãy chắc rằng bạn đã kiểm tra chúng rất nhiều lần và gỡ các lỗi liên quan.ào.
    Bốn nguyên tắc khi học code</p>
    <ol>
    <li>
    <p>Thực hành nhiều tốt hơn chỉ học theo lý thuyết;</p>
    </li>
    <li>
    <p>Làm dự án tốt hơn chỉ luyện các đoạn mã ngắn, rời rạc;</p>
    </li>
    <li>
    <p>Làm theo nhóm, giữ tinh thần đồng đội hơn là chỉ làm một mình;</p>
    </li>
    <li>
    <p>Nắm vững, chắc một ngôn ngữ hơn là biết nhiều ngôn ngữ nhưng không vững một ngôn ngữ nào.</p>
    </li>
    </ol>
    <p>Mentor Việt tiết lộ, khi phỏng vấn ứng viên, các nhà tuyển dụng thường yêu cầu lập trình viên giới thiệu về các ứng dụng mình từng thực hiện trong thời gian học. Vì vậy, để học code hiệu quả bạn cần ưu tiên: học lý thuyết chắc - thực hành nhiều, thực hiện các dự án cùng đồng đội hơn là tự code các đoạn mã nhỏ. Đặc biệt, khi bắt đầu học code, không cần biết quá nhiều ngôn ngữ, hãy học chắc một ngôn ngữ, chú tâm vào thực hành, chọn dự án và thực hiện ứng dụng bằng ngôn ngữ đó, sau đó mở rộng ra các ngôn ngữ khác.</p>
    <p>"Muốn đi nhanh hãy đi một mình, muốn đi xa hãy đi cùng nhau, các lập trình viên phải thường xuyên trao đổi kiến thức và kinh nghiệm để hoàn thiện sản phẩm một cách tốt nhất", anh Việt chia sẻ.</p>
    <p>Kinh nghiệm học tốt code</p>
    <ol>
    <li>
    <p>Thực hành nhiều;</p>
    </li>
    <li>
    <p>Tự gỡ lỗi (logic);</p>
    </li>
    <li>
    <p>Làm dự án với những tính năng hoàn chỉnh;</p>
    </li>
    <li>
    <p>Code lại các sản phẩm;</p>
    </li>
    <li>
    <p>Đọc sách lập trình;</p>
    </li>
    <li>
    <p>Tìm hiểu và thảo luận.</p>
    </li>
    </ol>
    <p>Anh Việt cho biết, đã làm nghề 10 năm và giữ vị trí quản lý nhưng hơn 10 năm nay anh vẫn code hàng ngày. Thời đi học thường code ít nhất bốn tiếng một ngày cho đến khi ở cương vị quản lý doanh nghiệp, anh vẫn dành hai tiếng một ngày để code. Với anh, việc lập trình như bài tập thể dục giúp bản thân sảng khoái mỗi ngày.</p>
    <p>Để luyện tập và thực hành code, người học lập trình có thể làm nhiều cách như: gỡ lỗi các chương trình, code game, thực hiện dự án... Người học có thể tìm một số website để thường xuyên luyện tập như codelearn, hackerank.</p>
    <p>Mentor Cao Văn Việt là Product Owner của Codelearn (FPT Software), chuyên gia công nghệ cấp Tập đoàn FPT. Tại FUNiX, anh Việt là mentor các môn thuộc Chứng chỉ 1 (Công dân số) và Chứng chỉ 3 (Lập trình viên ứng dụng doanh nghiệp). Anh có nhiều chia sẻ thú vị dành riêng cho các bạn trẻ theo học ngành CNTT, như các kinh nghiệm phỏng vấn xin việc ngành công nghệ, kinh nghiệm lập trình...</p>
    </div>`,
		reading_time: Math.ceil(1000 / 225),
		created_date: new Date('2023-04-04'),
	},
];
