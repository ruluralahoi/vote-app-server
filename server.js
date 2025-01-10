const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// CORS 설정
app.use(cors());
app.use(bodyParser.json());

let votes = {}; // 투표 결과 저장

// 새로운 투표 결과 저장
app.post('/api/votes', (req, res) => {
  const { questionId, option } = req.body;

  if (!votes[questionId]) {
    votes[questionId] = { optionA: 0, optionB: 0 };
  }

  if (option === 'A') {
    votes[questionId].optionA += 1;
  } else if (option === 'B') {
    votes[questionId].optionB += 1;
  }

  res.status(200).json(votes[questionId]);
});

// 현재 투표 결과 가져오기
app.get('/api/votes', (req, res) => {
  res.status(200).json(votes);
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
