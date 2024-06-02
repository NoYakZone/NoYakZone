package com.sm_oss.NoYakZone.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sm_oss.NoYakZone.model.Board;
import com.sm_oss.NoYakZone.repository.BoardRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    public Board createBoard(Board BoardDto) {
        BoardDto.setDate(LocalDateTime.now());
        return boardRepository.save(BoardDto);
    }

    public Board getBoardById(int id) {
        Optional<Board> board = boardRepository.findById(id);
        return board.orElse(null);
    }

    public List<Board> getAllBoards() {
        return boardRepository.findAll();
    }

    public Board updateBoard(int id, Board BoardDto) {
        Optional<Board> existingBoard = boardRepository.findById(id);
        if (existingBoard.isPresent()) {
            Board updatedBoard = existingBoard.get();
            updatedBoard.setText(BoardDto.getText());
            updatedBoard.setPlace(BoardDto.getPlace());
            updatedBoard.setUrl(BoardDto.getUrl());
            updatedBoard.setId(BoardDto.getId());
            updatedBoard.setWeb(BoardDto.getWeb());
            updatedBoard.setPicture(BoardDto.getPicture());
            return boardRepository.save(updatedBoard);
        } else {
            return null;
        }
    }

    public void deleteBoard(int id) {
        boardRepository.deleteById(id);
    }
}