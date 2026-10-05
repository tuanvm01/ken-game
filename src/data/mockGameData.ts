import type { Planet } from '../types/game';

export const GAME_DATA: Planet[] = [
  // ==========================================
  // HÀNH TINH 1: QUYỀN RIÊNG TƯ (Bodily Autonomy)
  // 5 Tình huống (Cases)
  // ==========================================
  {
    id: 'planet-1',
    title: 'Quyền riêng tư',
    color: 'bg-pink-400',
    icon: 'Shield',
    thumbnail: '/images/planets/planet1.png',
    scenarios: [
      {
        id: 'p1_s1',
        initialScore: 550,
        contextText: 'Trong giờ ra chơi, một bạn phát hiện em rất nhột nên cứ chọc ngón tay vào bụng. Ban đầu cả hai cùng cười, nhưng sau vài lần em bắt đầu thấy khó chịu.',
        baseImages: ['/images/Planet 01/Case01_00.png'],
        cards: [
          {
            id: 'p1_s1_c1', title: 'Nói rõ ràng', description: '"Dừng lại nhé, tớ không thích bị chọc bụng nữa."', image: '/images/Planet 01/Card01.png', isBest: true, score: 1000,
            feedback: 'Rõ ràng lắm! Em đã giúp người kia hiểu chính xác điều gì khiến mình khó chịu.',
            resultImages: ['/images/Planet 01/Case01_01.png'], resultSceneText: 'Bạn nhận ra và dừng lại ngay.', bgVariant: 'good'
          },
          {
            id: 'p1_s1_c2', title: 'Giữ khoảng cách', description: 'Em lùi ra xa khỏi tầm tay của bạn.', image: '/images/Planet 01/Card02.png', isBest: false, score: 850,
            feedback: 'Cách này đã giúp cơ thể em có khoảng cách an toàn hơn. Nên nói thêm điều mình không thích nhé.',
            resultImages: ['/images/Planet 01/Case01_02.png'], resultSceneText: 'Bạn không chọc được nữa và nhận ra em đang tránh.', bgVariant: 'bad'
          },
          {
            id: 'p1_s1_c3', title: 'Rời đi', description: 'Em lặng lẽ sang chơi với nhóm khác.', image: '/images/Planet 01/Card03.png', isBest: false, score: 700,
            feedback: 'Em đã rời khỏi điều khiến mình khó chịu. Nhưng người bạn vẫn chưa biết lý do.',
            resultImages: ['/images/Planet 01/Case01_03.png'], resultSceneText: 'Việc chọc dừng lại, nhưng bạn kia chưa hiểu lý do.', bgVariant: 'bad'
          },
          {
            id: 'p1_s1_c4', title: 'Cười cho qua', description: 'Em vẫn cố cười dù đã thấy khó chịu.', image: '/images/Planet 01/Card04.png', isBest: false, score: 250,
            feedback: 'Người bạn chưa biết rằng cảm giác của em đã thay đổi. Hãy thử cho tín hiệu rõ hơn nhé.',
            resultImages: ['/images/Planet 01/Case01_04.png'], resultSceneText: 'Bạn kia tưởng em vẫn thích nên tiếp tục chọc.', bgVariant: 'bad'
          }
        ],
        summary: { dos: ['Nói rõ ranh giới cơ thể.', 'Tạo khoảng cách an toàn.'], donts: ['Cười cho qua khi khó chịu.'] }
      },
      {
        id: 'p1_s2',
        initialScore: 650,
        contextText: 'Sau khi tắm, mẹ mang quần áo vào và định mặc giúp. Nhưng gần đây em đã tập được cách tự mặc và hôm nay muốn tự làm.',
        baseImages: ['/images/Planet 01/Case02_00.png'],
        cards: [
          {
            id: 'p1_s2_c1', title: 'Tự chủ', description: 'Em chủ động nhận áo từ mẹ rồi tự bắt đầu mặc.', image: '/images/Planet 01/Card05.png', isBest: true, score: 1000,
            feedback: 'Tốt lắm! Em đã chủ động làm phần việc liên quan đến cơ thể mà mình có thể tự làm.',
            resultImages: ['/images/Planet 01/Case02_01.png'], resultSceneText: 'Mẹ nhìn thấy và mỉm cười để em tự làm.', bgVariant: 'good'
          },
          {
            id: 'p1_s2_c2', title: 'Nói rõ ràng', description: '"Mẹ ơi, con muốn tự mặc hôm nay ạ."', image: '/images/Planet 01/Card06.png', isBest: false, score: 850,
            feedback: 'Rất rõ ràng! Em đã cho mẹ biết điều mình muốn. Giờ thử tự làm xem sao nhé.',
            resultImages: ['/images/Planet 01/Case02_02.png'], resultSceneText: 'Mẹ vui vẻ đưa quần áo cho em.', bgVariant: 'bad'
          },
          {
            id: 'p1_s2_c3', title: 'Nhờ giúp một phần', description: '"Con tự mặc áo, mẹ giúp con kéo khóa nhé."', image: '/images/Planet 01/Card07.png', isBest: false, score: 750,
            feedback: 'Ổn lắm! Tự chủ không có nghĩa là làm mọi thứ một mình. Em có thể chọn phần cần giúp.',
            resultImages: ['/images/Planet 01/Case02_03.png'], resultSceneText: 'Em tự làm phần lớn, mẹ giúp phần khó.', bgVariant: 'bad'
          },
          {
            id: 'p1_s2_c4', title: 'Giữ riêng tư', description: 'Em kéo khăn che người nhưng không nói gì.', image: '/images/Planet 01/Card08.png', isBest: false, score: 350,
            feedback: 'Em đã che cơ thể lại, nhưng mẹ chưa biết em muốn tự mặc. Thử nói ra điều mình cần nhé.',
            resultImages: ['/images/Planet 01/Case02_04.png'], resultSceneText: 'Mẹ vẫn chờ để mặc giúp vì chưa hiểu ý.', bgVariant: 'bad'
          }
        ],
        summary: { dos: ['Tự chăm sóc cơ thể.', 'Nói rõ mong muốn tự lập.'], donts: ['Im lặng khiến người lớn không hiểu ý.'] }
      },
      {
        id: 'p1_s3',
        initialScore: 550,
        contextText: 'Em đang thay quần áo. Em nhỏ đứng ngoài nói: "Khăn của em ở trong đó!" và bắt đầu đẩy cửa. Em vẫn chưa mặc đồ xong.',
        baseImages: ['/images/Planet 01/Case03_00.png'],
        cards: [
          {
            id: 'p1_s3_c1', title: 'Giữ riêng tư', description: 'Khép chắc cửa lại, xong mới mở cửa cho em lấy khăn.', image: '/images/Planet 01/Card01.png', isBest: true, score: 1000,
            feedback: 'Đúng rồi! Giữ không gian riêng của mình khi thay đồ là điều quan trọng nhất.',
            resultImages: ['/images/Planet 01/Case03_01.png'], resultSceneText: 'Không gian riêng tư được bảo vệ tuyệt đối.', bgVariant: 'good'
          },
          {
            id: 'p1_s3_c2', title: 'Nói rõ ràng', description: '"Đợi anh/chị thay xong nhé, rồi em vào lấy."', image: '/images/Planet 01/Card02.png', isBest: false, score: 850,
            feedback: 'Tốt lắm! Em đã giúp em nhỏ hiểu vì sao cần phải chờ.',
            resultImages: ['/images/Planet 01/Case03_02.png'], resultSceneText: 'Em nhỏ dừng đẩy cửa và đứng chờ.', bgVariant: 'bad'
          },
          {
            id: 'p1_s3_c3', title: 'Tự chủ hỗ trợ', description: 'Em lấy chiếc khăn và đưa ra qua khe cửa nhỏ.', image: '/images/Planet 01/Card03.png', isBest: false, score: 700,
            feedback: 'Em không nhất thiết phải vội xử lý việc của người khác khi đang thay đồ.',
            resultImages: ['/images/Planet 01/Case03_03.png'], resultSceneText: 'Em có khăn, cửa không mở hẳn.', bgVariant: 'bad'
          },
          {
            id: 'p1_s3_c4', title: 'Mở cửa ngay', description: 'Mở cửa luôn cho em vào lấy khăn dù chưa thay xong.', image: '/images/Planet 01/Card04.png', isBest: false, score: 250,
            feedback: 'Hãy thử tìm cách giúp em mà vẫn giữ được không gian riêng nhé.',
            resultImages: ['/images/Planet 01/Case03_04.png'], resultSceneText: 'Em lập tức thấy ngại và phải kéo áo che người.', bgVariant: 'bad'
          }
        ],
        summary: { dos: ['Khóa chặt cửa bảo vệ riêng tư.'], donts: ['Mở cửa khi chưa mặc xong đồ.'] }
      },
      {
        id: 'p1_s4',
        initialScore: 600,
        contextText: 'Vào buồng thay đồ nhưng chốt cửa bị hỏng. Bên ngoài nhiều bạn qua lại. Em cần thay quần áo nhưng sợ cửa bất ngờ mở ra.',
        baseImages: ['/images/Planet 01/Case04_00.png'],
        cards: [
          {
            id: 'p1_s4_c1', title: 'Nhờ giúp đỡ', description: '"Cô ơi, cửa hỏng rồi. Con thay chỗ khác nhé ạ?"', image: '/images/Planet 01/Card05.png', isBest: true, score: 1000,
            feedback: 'Chính xác! Đây là vấn đề của không gian, không phải việc em phải tự xoay xở.',
            resultImages: ['/images/Planet 01/Case04_01.png'], resultSceneText: 'Huấn luyện viên chỉ cho buồng khác an toàn.', bgVariant: 'good'
          },
          {
            id: 'p1_s4_c2', title: 'Giữ bằng chân', description: 'Em giữ cửa khép bằng chân trong khi thay đồ.', image: '/images/Planet 01/Card06.png', isBest: false, score: 850,
            feedback: 'Em đã cố giữ sự riêng tư, nhưng với cửa hỏng, có cách an toàn hơn.',
            resultImages: ['/images/Planet 01/Case04_02.png'], resultSceneText: 'Cửa không mở ra nhưng thay đồ hơi bất tiện.', bgVariant: 'bad'
          },
          {
            id: 'p1_s4_c3', title: 'Nói rõ cảnh báo', description: '"Tớ đang thay đồ, đừng mở cửa nhé."', image: '/images/Planet 01/Card07.png', isBest: false, score: 700,
            feedback: 'Giúp mọi người biết ý, tuy nhiên chiếc cửa vẫn chưa hoạt động bình thường.',
            resultImages: ['/images/Planet 01/Case04_03.png'], resultSceneText: 'Các bạn biết bên trong có người và tránh cửa.', bgVariant: 'bad'
          },
          {
            id: 'p1_s4_c4', title: 'Tự sửa khóa', description: 'Em tự ngồi thử sửa chốt cửa một mình.', image: '/images/Planet 01/Card08.png', isBest: false, score: 300,
            feedback: 'Với khóa hỏng, em không cần tự sửa — hãy tìm người giúp nhé.',
            resultImages: ['/images/Planet 01/Case04_04.png'], resultSceneText: 'Chốt vẫn không giữ được, kém an toàn.', bgVariant: 'bad'
          }
        ],
        summary: { dos: ['Nhờ người lớn hỗ trợ khi cơ sở vật chất hỏng.'], donts: ['Chịu đựng thay đồ trong môi trường thiếu an toàn.'] }
      },
      {
        id: 'p1_s5',
        initialScore: 500,
        contextText: 'Nhóm bạn bên ngoài đùa dai và hé rèm nhìn vào buồng em đang thay đồ. Em đã nhắc "Đừng mở nhé" nhưng các bạn vẫn tiếp tục.',
        baseImages: ['/images/Planet 01/Case05_00.png'],
        cards: [
          {
            id: 'p1_s5_c1', title: 'Rời đi', description: 'Em quấn khăn, chuyển ngay sang một buồng khác.', image: '/images/Planet 01/Card01.png', isBest: true, score: 1000,
            feedback: 'Tốt lắm! Khi người khác không tôn trọng ranh giới, em có thể rời đi.',
            resultImages: ['/images/Planet 01/Case05_01.png'], resultSceneText: 'Các bạn không còn tiếp cận được em nữa.', bgVariant: 'good'
          },
          {
            id: 'p1_s5_c2', title: 'Nhờ giúp', description: '"Cô ơi, các bạn cứ mở rèm lúc con đang thay đồ."', image: '/images/Planet 01/Card02.png', isBest: false, score: 850,
            feedback: 'Rất tốt! Em hoàn toàn có thể tìm người lớn giúp mình bảo vệ sự riêng tư.',
            resultImages: ['/images/Planet 01/Case05_02.png'], resultSceneText: 'Huấn luyện viên tới và yêu cầu các bạn dừng lại.', bgVariant: 'bad'
          },
          {
            id: 'p1_s5_c3', title: 'Nói rõ ràng', description: '"Tớ đã bảo đừng mở rồi. Dừng lại nhé."', image: '/images/Planet 01/Card03.png', isBest: false, score: 700,
            feedback: 'Em đã nói rất rõ. Nhưng vì họ đã không nghe, hãy tìm cách an toàn hơn.',
            resultImages: ['/images/Planet 01/Case05_03.png'], resultSceneText: 'Các bạn chững lại, nhưng chưa chắc sẽ dừng hẳn.', bgVariant: 'bad'
          },
          {
            id: 'p1_s5_c4', title: 'Giữ riêng', description: 'Em kéo rèm lại lần nữa và tiếp tục thay đồ.', image: '/images/Planet 01/Card04.png', isBest: false, score: 250,
            feedback: 'Khi ranh giới không được tôn trọng, hãy tăng mức phản ứng thay vì chịu đựng.',
            resultImages: ['/images/Planet 01/Case05_04.png'], resultSceneText: 'Một bạn lại đưa tay định hé rèm tiếp.', bgVariant: 'bad'
          }
        ],
        summary: { dos: ['Rời đi hoặc báo người lớn khi bị xâm phạm riêng tư.'], donts: ['Nhẫn nhịn khi bạn bè đùa dai.'] }
      }
    ]
  },

  // ==========================================
  // HÀNH TINH 2: ĐỒNG THUẬN (Consent)
  // 7 Tình huống (Cases)
  // ==========================================
  {
    id: 'planet-2',
    title: 'Đồng thuận',
    color: 'bg-green-400',
    icon: 'Heart',
    thumbnail: '/images/planets/planet2.png',
    scenarios: [
      {
        id: 'p2_s1',
        initialScore: 550,
        contextText: 'Một người cô quen bước tới: "Ôi, lâu không gặp! Má vẫn phúng phính thế này!" Cô đưa tay định véo má, nhưng em không thích bị véo má.',
        baseImages: ['/images/Planet 02/Case01_0Start.png'],
        cards: [
          {
            id: 'p2_s1_c1', title: 'Từ chối nhẹ nhàng', description: '"Cô đừng véo má cháu nhé."', image: '/images/Planet 02/Card01.png', isBest: true, score: 1000,
            feedback: 'Rõ ràng lắm! Khi không thích một cái chạm, em có thể nói thẳng điều mình muốn.',
            resultImages: ['/images/Planet 02/Case01_1.png'], resultSceneText: 'Cô dừng tay: "Ừ, được rồi."', bgVariant: 'good'
          },
          {
            id: 'p2_s1_c2', title: 'Đề xuất cách khác', description: '"Cô đập tay với cháu nhé!"', image: '/images/Planet 02/Card02.png', isBest: false, score: 800,
            feedback: 'Cách này cũng ổn! Thử xem còn cách nào nói rõ ranh giới hơn không nhé.',
            resultImages: ['/images/Planet 02/Case01_2.png'], resultSceneText: 'Cô cười rồi high-five với em.', bgVariant: 'bad'
          },
          {
            id: 'p2_s1_c3', title: 'Chấp nhận', description: '"Dạ..." Em đứng yên để cô véo má nhưng khó chịu.', image: '/images/Planet 02/Card03.png', isBest: false, score: 250,
            feedback: 'Hãy thử chọn cách thể hiện điều em thật sự muốn thay vì chịu đựng nhé.',
            resultImages: ['/images/Planet 02/Case01_3.png'], resultSceneText: 'Cô véo má em và em cảm thấy không vui.', bgVariant: 'bad'
          }
        ],
        summary: { dos: ['Nói không với những cái chạm không mong muốn.'], donts: ['Cam chịu khi người lớn xâm phạm cơ thể.'] }
      },
      {
        id: 'p2_s2',
        initialScore: 600,
        contextText: 'Chuẩn bị chụp ảnh, người chụp nói: "Hai đứa đứng sát vào! Con khoác vai em đi." Em chưa biết em họ có muốn được khoác vai hay không.',
        baseImages: ['/images/Planet 02/Case02_0Start.png'],
        cards: [
          {
            id: 'p2_s2_c1', title: 'Xin phép', description: 'Em quay sang hỏi: "Em có muốn anh/chị khoác vai không?"', image: '/images/Planet 02/Card04.png', isBest: true, score: 1000,
            feedback: 'Tuyệt! Em đã hỏi chính người sắp được chạm vào thay vì tự quyết thay bạn ấy.',
            resultImages: ['/images/Planet 02/Case02_1.png'], resultSceneText: 'Em được tự trả lời rồi hai người tạo dáng thoải mái.', bgVariant: 'good'
          },
          {
            id: 'p2_s2_c2', title: 'Cách khác', description: '"Bọn con đứng cạnh nhau thôi nhé!"', image: '/images/Planet 02/Card01.png', isBest: false, score: 850,
            feedback: 'Một cách rất ổn! Không nhất thiết phải chạm vào nhau để có bức ảnh đẹp.',
            resultImages: ['/images/Planet 02/Case02_2.png'], resultSceneText: 'Hai người chụp ảnh cạnh nhau không cần chạm.', bgVariant: 'bad'
          },
          {
            id: 'p2_s2_c3', title: 'Từ chối hộ / Làm theo', description: 'Làm theo sự sắp đặt hoặc từ chối mà không hỏi em.', image: '/images/Planet 02/Card02.png', isBest: false, score: 250,
            feedback: 'Ở đây còn có cảm nhận của em nhỏ nữa — hãy hỏi ý kiến người kia nhé.',
            resultImages: ['/images/Planet 02/Case02_3.png'], resultSceneText: 'Tình huống gượng gạo vì chưa có sự đồng thuận.', bgVariant: 'bad'
          }
        ],
        summary: { dos: ['Hỏi ý kiến trước khi chạm vào người khác.'], donts: ['Tự ý đụng chạm dù được người lớn xúi giục.'] }
      },
      {
        id: 'p2_s3',
        initialScore: 700,
        contextText: 'Nhóm bạn vừa thắng và đang ôm nhau ăn mừng. Bạn đứng cạnh bỗng nói: "Tớ không thích ôm đâu nhé."',
        baseImages: ['/images/Planet 02/Case03_0Start.png'],
        cards: [
          {
            id: 'p2_s3_c1', title: 'Tôn trọng', description: '"Ừ, không sao."', image: '/images/Planet 02/Card03.png', isBest: true, score: 1000,
            feedback: 'Chính xác! Em đã nghe và tôn trọng điều bạn ấy vừa nói.',
            resultImages: ['/images/Planet 02/Case03_1.png'], resultSceneText: 'Hai bạn vẫn vui vẻ đứng cạnh nhau.', bgVariant: 'good'
          },
          {
            id: 'p2_s3_c2', title: 'Đề xuất cách khác', description: '"Vậy đập tay nhé?"', image: '/images/Planet 02/Card04.png', isBest: false, score: 850,
            feedback: 'Ý hay! Nhớ chờ bạn ấy đồng ý với cách ăn mừng mới này nữa nhé.',
            resultImages: ['/images/Planet 02/Case03_2.png'], resultSceneText: 'Bạn đồng ý rồi hai người high-five vui vẻ.', bgVariant: 'bad'
          }
        ],
        summary: { dos: ['Tôn trọng khi người khác từ chối đụng chạm.'], donts: ['Nài nỉ khi bạn bè đã nói Không.'] }
      },
      {
        id: 'p2_s4',
        initialScore: 550,
        contextText: 'Bạn chạy nhanh hơn rồi nắm cổ tay em kéo đi: "Nhanh lên!" Em không thích bị kéo tay như vậy.',
        baseImages: ['/images/Planet 02/Case04_0Start.png'],
        cards: [
          {
            id: 'p2_s4_c1', title: 'Từ chối', description: '"Đừng kéo tay tớ nhé."', image: '/images/Planet 02/Card01.png', isBest: true, score: 1000,
            feedback: 'Rất rõ ràng! Em đã nói chính xác hành động nào khiến mình không thoải mái.',
            resultImages: ['/images/Planet 02/Case04_1.png'], resultSceneText: 'Bạn thả tay em ra ngay.', bgVariant: 'good'
          },
          {
            id: 'p2_s4_c2', title: 'Chỉ cách khác', description: '"Cậu chạy trước đi, tớ theo sau."', image: '/images/Planet 02/Card02.png', isBest: false, score: 800,
            feedback: 'Ổn lắm! Nếu muốn rõ hơn, em có thể nói luôn rằng mình không thích bị kéo tay.',
            resultImages: ['/images/Planet 02/Case04_2.png'], resultSceneText: 'Bạn thả tay rồi chạy trước.', bgVariant: 'bad'
          },
          {
            id: 'p2_s4_c3', title: 'Cam chịu', description: 'Em tiếp tục để bạn kéo đi.', image: '/images/Planet 02/Card03.png', isBest: false, score: 200,
            feedback: 'Thử cho người bạn biết điều gì đang làm em khó chịu nhé.',
            resultImages: ['/images/Planet 02/Case04_3.png'], resultSceneText: 'Em nhăn mặt khó chịu nhưng vẫn bị kéo.', bgVariant: 'bad'
          }
        ],
        summary: { dos: ['Nói không với những đụng chạm làm mình khó chịu.'], donts: ['Im lặng để bạn kéo đi.'] }
      },
      {
        id: 'p2_s5',
        initialScore: 700,
        contextText: 'Em thấy một vệt màu trên má bạn và tay em đang cầm sẵn khăn giấy.',
        baseImages: ['/images/Planet 02/Case05_0Start.png'],
        cards: [
          {
            id: 'p2_s5_c1', title: 'Xin phép', description: '"Tớ lau giúp cậu nhé?"', image: '/images/Planet 02/Card04.png', isBest: true, score: 1000,
            feedback: 'Đúng rồi! Hỏi trước là cách rõ ràng nhất để có sự đồng thuận.',
            resultImages: ['/images/Planet 02/Case05_1.png'], resultSceneText: 'Bạn đồng ý rồi em mới lau.', bgVariant: 'good'
          },
          {
            id: 'p2_s5_c2', title: 'Đưa khăn', description: '"Có vệt ở má này, cậu tự lau nhé."', image: '/images/Planet 02/Card01.png', isBest: false, score: 850,
            feedback: 'Cách này cũng rất ổn! Em vẫn giúp mà không cần chạm vào bạn.',
            resultImages: ['/images/Planet 02/Case05_2.png'], resultSceneText: 'Bạn tự cầm khăn và lau sạch.', bgVariant: 'bad'
          }
        ],
        summary: { dos: ['Hỏi ý kiến bạn trước khi lau giúp.'], donts: ['Tự ý chà xát lên mặt bạn.'] }
      },
      {
        id: 'p2_s6',
        initialScore: 650,
        contextText: 'Đi qua chỗ đông, bạn đưa tay: "Đông quá. Mình nắm tay nhau nhé?" Em đang không muốn nắm tay.',
        baseImages: ['/images/Planet 02/Case06_0Start.png'],
        cards: [
          {
            id: 'p2_s6_c1', title: 'Từ chối', description: '"Tớ không muốn nắm tay."', image: '/images/Planet 02/Card02.png', isBest: true, score: 1000,
            feedback: 'Tốt lắm! Em đã trả lời đúng với cảm giác thật của mình.',
            resultImages: ['/images/Planet 02/Case06_1.png'], resultSceneText: 'Bạn rút tay lại vui vẻ.', bgVariant: 'good'
          },
          {
            id: 'p2_s6_c2', title: 'Cách khác', description: '"Mình đi sát cạnh nhau nhé."', image: '/images/Planet 02/Card03.png', isBest: false, score: 850,
            feedback: 'Một cách hợp lý! Vẫn giải quyết được việc đi cùng nhau mà không cần nắm tay.',
            resultImages: ['/images/Planet 02/Case06_2.png'], resultSceneText: 'Hai người đi cạnh nhau qua đám đông.', bgVariant: 'bad'
          },
          {
            id: 'p2_s6_c3', title: 'Gượng ép', description: '"Ừ..." Em nắm tay nhưng trong lòng không thoải mái.', image: '/images/Planet 02/Card04.png', isBest: false, score: 300,
            feedback: 'Hãy chọn câu trả lời phù hợp với cảm giác thực sự của mình nhé.',
            resultImages: ['/images/Planet 02/Case06_3.png'], resultSceneText: 'Em nắm tay đi tiếp nhưng không vui.', bgVariant: 'bad'
          }
        ],
        summary: { dos: ['Thành thật từ chối khi không muốn đụng chạm.'], donts: ['Gượng ép đồng ý để làm hài lòng bạn.'] }
      },
      {
        id: 'p2_s7',
        initialScore: 550,
        contextText: 'Hai bạn đang cù nhau vui vẻ. Một lúc sau em bắt đầu khó chịu, nhưng bạn vẫn cù: "Thêm cái nữa!"',
        baseImages: ['/images/Planet 02/Case07_0Start.png'],
        cards: [
          {
            id: 'p2_s7_c1', title: 'Yêu cầu dừng', description: '"Dừng lại nhé, tớ không muốn nữa."', image: '/images/Planet 02/Card01.png', isBest: true, score: 1000,
            feedback: 'Chính xác! Em được phép đổi ý, kể cả khi lúc đầu đã đồng ý.',
            resultImages: ['/images/Planet 02/Case07_1.png'], resultSceneText: 'Bạn dừng tay ngay.', bgVariant: 'good'
          },
          {
            id: 'p2_s7_c2', title: 'Đổi trò', description: '"Mình chơi trò khác đi."', image: '/images/Planet 02/Card02.png', isBest: false, score: 850,
            feedback: 'Cách này giúp tình huống dừng lại êm đẹp.',
            resultImages: ['/images/Planet 02/Case07_2.png'], resultSceneText: 'Hai người chuyển sang trò khác.', bgVariant: 'bad'
          },
          {
            id: 'p2_s7_c3', title: 'Cam chịu', description: 'Tiếp tục cho bạn cù dù đã khó chịu.', image: '/images/Planet 02/Card03.png', isBest: false, score: 200,
            feedback: 'Đồng ý lúc trước không có nghĩa là phải tiếp tục mãi. Hãy lên tiếng nhé.',
            resultImages: ['/images/Planet 02/Case07_3.png'], resultSceneText: 'Em ngày càng khó chịu và cáu gắt.', bgVariant: 'bad'
          }
        ],
        summary: { dos: ['Được quyền đổi ý bất kỳ lúc nào.'], donts: ['Chịu đựng chỉ vì lúc đầu đã đồng ý chơi.'] }
      }
    ]
  },

  // ==========================================
  // HÀNH TINH 3: GIAO TIẾP & LẮNG NGHE (Communication)
  // 6 Tình huống (Cases)
  // ==========================================
  {
    id: 'planet-3',
    title: 'Giao tiếp',
    color: 'bg-blue-400',
    icon: 'MessageCircle',
    thumbnail: '/images/planets/planet3.png',
    scenarios: [
      {
        id: 'p3_s1',
        initialScore: 550,
        contextText: 'Một bạn nhìn em rồi đùa: "Cậu gầy như que ấy!" Mấy bạn khác cười. Em không thích bị nhận xét như vậy.',
        baseImages: ['/images/Planet 03/Case01_00.png'],
        cards: [
          {
            id: 'p3_s1_c1', title: 'Nói rõ', description: '"Tớ không thích cậu gọi tớ như vậy."', image: '/images/Planet 03/Card01.png', isBest: true, score: 1000,
            feedback: 'Rất rõ ràng! Em đã nói chính xác lời nào khiến mình không thoải mái.',
            resultImages: ['/images/Planet 03/Case01_01.png'], resultSceneText: 'Bạn khựng lại và xin lỗi.', bgVariant: 'good'
          },
          {
            id: 'p3_s1_c2', title: 'Đổi cách nói', description: 'Nói riêng: "Lúc nãy mọi người cười, tớ thấy ngại lắm."', image: '/images/Planet 03/Card02.png', isBest: false, score: 850,
            feedback: 'Cách nói riêng giúp cuộc trò chuyện dễ chịu hơn.',
            resultImages: ['/images/Planet 03/Case01_02.png'], resultSceneText: 'Bạn hiểu hơn và thông cảm.', bgVariant: 'bad'
          },
          {
            id: 'p3_s1_c3', title: 'Hỏi lại', description: '"Cậu nói thế vì thấy vui à?"', image: '/images/Planet 03/Card03.png', isBest: false, score: 700,
            feedback: 'Bạn chưa biết rằng em không thích câu nói đó.',
            resultImages: ['/images/Planet 03/Case01_03.png'], resultSceneText: 'Bạn trả lời: "Tớ đùa thôi mà."', bgVariant: 'bad'
          },
          {
            id: 'p3_s1_c4', title: 'Cười cho qua', description: 'Em cười gượng cùng mọi người.', image: '/images/Planet 03/Card04.png', isBest: false, score: 250,
            feedback: 'Hãy thử giúp họ hiểu cảm giác thật của em nhé.',
            resultImages: ['/images/Planet 03/Case01_04.png'], resultSceneText: 'Họ tiếp tục trêu đùa.', bgVariant: 'bad'
          }
        ],
        summary: { dos: ['Diễn đạt rõ ràng cảm xúc khi bị trêu.'], donts: ['Cười gượng làm người khác hiểu lầm.'] }
      },
      {
        id: 'p3_s2',
        initialScore: 650,
        contextText: 'Bạn bối rối tâm sự: "Mấy bạn cứ bảo tớ thích Minh vì hay chơi cùng. Tớ thấy ngại mà chẳng biết nói sao."',
        baseImages: ['/images/Planet 03/Case02_00.png'],
        cards: [
          {
            id: 'p3_s2_c1', title: 'Lắng nghe', description: '"Ừ, cậu kể tiếp đi." (Để bạn nói hết chuyện)', image: '/images/Planet 03/Card05.png', isBest: true, score: 1000,
            feedback: 'Tốt lắm! Điều đầu tiên có thể làm là nghe bạn ấy nói hết.',
            resultImages: ['/images/Planet 03/Case02_01.png'], resultSceneText: 'Bạn bình tĩnh hơn và kể tiếp.', bgVariant: 'good'
          },
          {
            id: 'p3_s2_c2', title: 'Hỏi lại', description: '"Cậu khó chịu vì bị ghép đôi à?"', image: '/images/Planet 03/Card06.png', isBest: false, score: 850,
            feedback: 'Em đã kiểm tra xem mình hiểu đúng cảm giác của bạn chưa.',
            resultImages: ['/images/Planet 03/Case02_02.png'], resultSceneText: 'Bạn gật đầu: "Ừ, đúng rồi."', bgVariant: 'bad'
          },
          {
            id: 'p3_s2_c3', title: 'Nói lập luận', description: '"Chơi với nhau đâu có nghĩa là thích nhau."', image: '/images/Planet 03/Card07.png', isBest: false, score: 700,
            feedback: 'Thử nghe thêm xem bạn ấy đang thực sự cần gì nhé.',
            resultImages: ['/images/Planet 03/Case02_03.png'], resultSceneText: 'Bạn gật đầu nhưng vẫn buồn.', bgVariant: 'bad'
          },
          {
            id: 'p3_s2_c4', title: 'Vội khuyên', description: '"Kệ đi, đừng để ý nữa!"', image: '/images/Planet 03/Card08.png', isBest: false, score: 300,
            feedback: 'Em vội khuyên khi chưa hiểu hết chuyện. Thử lắng nghe nhiều hơn.',
            resultImages: ['/images/Planet 03/Case02_04.png'], resultSceneText: 'Bạn im xuống.', bgVariant: 'bad'
          }
        ],
        summary: { dos: ['Lắng nghe trọn vẹn trước khi khuyên.'], donts: ['Vội gạt đi cảm xúc của bạn bè.'] }
      },
      {
        id: 'p3_s3',
        initialScore: 500,
        contextText: 'Người lớn trêu lớn: "Lớn thế này có người yêu chưa?" Mọi người đều nhìn. Em thấy ngượng và không muốn nói chuyện này.',
        baseImages: ['/images/Planet 03/Case03_00.png'],
        cards: [
          {
            id: 'p3_s3_c1', title: 'Đổi chủ đề', description: '"Con hơi ngại. Mình nói chuyện khác nhé ạ?"', image: '/images/Planet 03/Card09.png', isBest: true, score: 1000,
            feedback: 'Khéo lắm! Em vừa nói được cảm giác, vừa chuyển chủ đề.',
            resultImages: ['/images/Planet 03/Case03_01.png'], resultSceneText: 'Mọi người cười: "Ừ thôi, không trêu nữa."', bgVariant: 'good'
          },
          {
            id: 'p3_s3_c2', title: 'Nói rõ', description: '"Con không muốn nói chuyện này ạ."', image: '/images/Planet 03/Card01.png', isBest: false, score: 850,
            feedback: 'Rất rõ ràng! Em hoàn toàn có quyền từ chối chia sẻ.',
            resultImages: ['/images/Planet 03/Case03_02.png'], resultSceneText: 'Người lớn dừng hỏi.', bgVariant: 'bad'
          },
          {
            id: 'p3_s3_c3', title: 'Hỏi ngược lại', description: '"Sao chú lại hỏi con chuyện đó ạ?"', image: '/images/Planet 03/Card02.png', isBest: false, score: 700,
            feedback: 'Nếu vẫn thấy ngại, em có thể trực tiếp đổi chủ đề.',
            resultImages: ['/images/Planet 03/Case03_03.png'], resultSceneText: 'Người lớn đáp: "Chú trêu thôi mà."', bgVariant: 'bad'
          },
          {
            id: 'p3_s3_c4', title: 'Cười cho qua', description: 'Em chỉ cười ngượng và cúi xuống ăn tiếp.', image: '/images/Planet 03/Card03.png', isBest: false, score: 200,
            feedback: 'Thử cho mọi người biết em muốn dừng chủ đề này nhé.',
            resultImages: ['/images/Planet 03/Case03_04.png'], resultSceneText: 'Họ lại hùa vào trêu tiếp.', bgVariant: 'bad'
          }
        ],
        summary: { dos: ['Chuyển chủ đề khéo léo.'], donts: ['Chịu đựng sự ngượng ngùng.'] }
      },
      {
        id: 'p3_s4',
        initialScore: 650,
        contextText: 'Anh lớn nói: "Đến lúc dậy thì cơ thể thay đổi nhiều lắm." Em từng nghe từ "dậy thì" nhưng chưa hiểu rõ.',
        baseImages: ['/images/Planet 03/Case04_00.png'],
        cards: [
          {
            id: 'p3_s4_c1', title: 'Hỏi rõ', description: '"Dậy thì thì cơ thể thay đổi như thế nào ạ?"', image: '/images/Planet 03/Card04.png', isBest: true, score: 1000,
            feedback: 'Đúng rồi! Hỏi thẳng giúp em có thông tin rõ ràng hơn.',
            resultImages: ['/images/Planet 03/Case04_01.png'], resultSceneText: 'Anh giải thích ví dụ đơn giản dễ hiểu.', bgVariant: 'good'
          },
          {
            id: 'p3_s4_c2', title: 'Lắng nghe chờ', description: 'Em im lặng chờ anh giải thích tiếp.', image: '/images/Planet 03/Card05.png', isBest: false, score: 850,
            feedback: 'Nghe trước cũng rất tốt! Có thể câu trả lời sẽ xuất hiện.',
            resultImages: ['/images/Planet 03/Case04_02.png'], resultSceneText: 'Anh kể tiếp về những thay đổi.', bgVariant: 'bad'
          },
          {
            id: 'p3_s4_c3', title: 'Đổi cách nói', description: '"Ý anh là lúc lớn lên cơ thể sẽ khác à?"', image: '/images/Planet 03/Card06.png', isBest: false, score: 700,
            feedback: 'Muốn biết rõ hơn, hãy hỏi cụ thể điều mình thắc mắc nhé.',
            resultImages: ['/images/Planet 03/Case04_03.png'], resultSceneText: 'Anh gật đầu xác nhận.', bgVariant: 'bad'
          },
          {
            id: 'p3_s4_c4', title: 'Giả vờ hiểu', description: '"À... em biết rồi." (Dù vẫn không hiểu)', image: '/images/Planet 03/Card07.png', isBest: false, score: 300,
            feedback: 'Giả vờ hiểu khiến em bỏ lỡ kiến thức — thử hỏi lại nhé.',
            resultImages: ['/images/Planet 03/Case04_04.png'], resultSceneText: 'Em vẫn không biết dậy thì là gì.', bgVariant: 'bad'
          }
        ],
        summary: { dos: ['Mạnh dạn đặt câu hỏi khi không hiểu.'], donts: ['Giả vờ hiểu và giấu dốt.'] }
      },
      {
        id: 'p3_s5',
        initialScore: 500,
        contextText: 'Bạn đứng gần nói to: "Sao người cậu có mùi thế?" Em thấy ngại và thắc mắc vì sao chạy xong lại có mùi.',
        baseImages: ['/images/Planet 03/Case05_00.png'],
        cards: [
          {
            id: 'p3_s5_c1', title: 'Hỏi người lớn', description: 'Gặp riêng bố mẹ hỏi: "Vì sao chạy xong lại có mùi ạ?"', image: '/images/Planet 03/Card08.png', isBest: true, score: 1000,
            feedback: 'Tuyệt! Em chọn đúng người để hỏi chuyện cơ thể mà mình chưa hiểu.',
            resultImages: ['/images/Planet 03/Case05_01.png'], resultSceneText: 'Người lớn giải thích tận tình.', bgVariant: 'good'
          },
          {
            id: 'p3_s5_c2', title: 'Nói rõ', description: '"Đừng nói to thế, tớ thấy ngại."', image: '/images/Planet 03/Card09.png', isBest: false, score: 850,
            feedback: 'Em giải quyết được sự khó chịu, nhưng thắc mắc cơ thể chưa được giải đáp.',
            resultImages: ['/images/Planet 03/Case05_02.png'], resultSceneText: 'Bạn hạ giọng xin lỗi.', bgVariant: 'bad'
          },
          {
            id: 'p3_s5_c3', title: 'Hỏi bạn bè', description: '"Cậu biết tại sao chạy xong có mùi không?"', image: '/images/Planet 03/Card01.png', isBest: false, score: 700,
            feedback: 'Bạn bè không phải lúc nào cũng biết rõ. Tìm người lớn nhé.',
            resultImages: ['/images/Planet 03/Case05_03.png'], resultSceneText: 'Bạn nhún vai không biết.', bgVariant: 'bad'
          },
          {
            id: 'p3_s5_c4', title: 'Giấu đi', description: 'Kéo áo che người, lảng tránh không nói chuyện.', image: '/images/Planet 03/Card02.png', isBest: false, score: 250,
            feedback: 'Em vẫn thắc mắc và ngại ngùng. Hãy hỏi người tin tưởng nhé.',
            resultImages: ['/images/Planet 03/Case05_04.png'], resultSceneText: 'Em tiếp tục mang nỗi lo lắng.', bgVariant: 'bad'
          }
        ],
        summary: { dos: ['Chọn người và thời điểm hỏi về cơ thể.'], donts: ['Xấu hổ tự thu mình lại.'] }
      },
      {
        id: 'p3_s6',
        initialScore: 650,
        contextText: 'Giáo viên nói: "Có những phần trên cơ thể được coi là vùng riêng tư." Em chưa hiểu "vùng riêng tư" là những phần nào.',
        baseImages: ['/images/Planet 03/Case06_00.png'],
        cards: [
          {
            id: 'p3_s6_c1', title: 'Hỏi lại ngay', description: 'Giơ tay: "Vùng riêng tư là những phần nào ạ?"', image: '/images/Planet 03/Card03.png', isBest: true, score: 1000,
            feedback: 'Câu hỏi rất rõ! Hỏi chính xác giúp tránh nhầm lẫn.',
            resultImages: ['/images/Planet 03/Case06_01.png'], resultSceneText: 'Cô giải thích rõ bằng ngôn ngữ phù hợp.', bgVariant: 'good'
          },
          {
            id: 'p3_s6_c2', title: 'Đợi cuối giờ', description: 'Lên gặp cô: "Lúc nãy con chưa hiểu vùng riêng tư ạ."', image: '/images/Planet 03/Card04.png', isBest: false, score: 850,
            feedback: 'Cách này cũng rất tốt và kín đáo.',
            resultImages: ['/images/Planet 03/Case06_02.png'], resultSceneText: 'Cô ân cần giải thích riêng.', bgVariant: 'bad'
          },
          {
            id: 'p3_s6_c3', title: 'Nói chung chung', description: '"Con chưa hiểu bài ạ."', image: '/images/Planet 03/Card05.png', isBest: false, score: 700,
            feedback: 'Nói cụ thể câu hỏi em sẽ nhận được câu trả lời nhanh hơn.',
            resultImages: ['/images/Planet 03/Case06_03.png'], resultSceneText: 'Cô phải hỏi lại xem em chưa hiểu chỗ nào.', bgVariant: 'bad'
          },
          {
            id: 'p3_s6_c4', title: 'Gật đầu cho qua', description: 'Em ngồi im không hỏi dù không biết nó là gì.', image: '/images/Planet 03/Card06.png', isBest: false, score: 300,
            feedback: 'Không hiểu thì hãy mạnh dạn hỏi nhé.',
            resultImages: ['/images/Planet 03/Case06_04.png'], resultSceneText: 'Bài học tiếp tục và em mất kiến thức.', bgVariant: 'bad'
          }
        ],
        summary: { dos: ['Mạnh dạn đặt câu hỏi.'], donts: ['Gật gù vờ hiểu bài.'] }
      }
    ]
  },
  
  // ==========================================
  // HÀNH TINH 4 & 5 (Mẫu giữ lại để Map không lỗi)
  // ==========================================
  {
    id: 'planet-4', title: 'Bảo vệ bản thân', color: 'bg-purple-400', icon: 'ShieldAlert', thumbnail: '/images/planets/planet4.png',
    scenarios: [
      {
        id: 'p4_s1', initialScore: 500, contextText: 'Đang xây dựng dữ liệu...', baseImages: ['/images/Planet 04/Case01_00.png'],
        cards: [
          { id: 'p4_c1', title: 'An toàn', description: 'Chọn an toàn.', image: '/images/Planet 04/Card01.png', isBest: true, score: 1000, feedback: 'Tốt!', resultImages: ['/images/Planet 04/Case01_01.png'], resultSceneText: 'An toàn.', bgVariant: 'good' }
        ],
        summary: { dos: ['Luôn báo cáo.'], donts: ['Tự xử lý.'] }
      }
    ]
  },
  {
    id: 'planet-5', title: 'An toàn thông minh', color: 'bg-amber-400', icon: 'Sparkles', thumbnail: '/images/planets/planet5.png',
    scenarios: [
      {
        id: 'p5_s1', initialScore: 500, contextText: 'Đang xây dựng dữ liệu...', baseImages: ['/images/Planet 05/Case01_00.png'],
        cards: [
          { id: 'p5_c1', title: 'Bảo mật', description: 'Giữ bí mật.', image: '/images/Planet 05/Card01.png', isBest: true, score: 1000, feedback: 'Tốt!', resultImages: ['/images/Planet 05/Case01_01.png'], resultSceneText: 'Bảo mật.', bgVariant: 'good' }
        ],
        summary: { dos: ['Bảo mật.'], donts: ['Chia sẻ.'] }
      }
    ]
  }
];