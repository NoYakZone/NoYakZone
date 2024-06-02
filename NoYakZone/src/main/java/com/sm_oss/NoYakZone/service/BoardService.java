package com.sm_oss.NoYakZone.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sm_oss.NoYakZone.model.BoardDto;
import com.sm_oss.NoYakZone.repository.BoardRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    public BoardDto createBoard(BoardDto BoardDto) {
        BoardDto.setDate(LocalDateTime.now());
        return boardRepository.save(BoardDto);
    }

    public BoardDto getBoardById(int id) {
        Optional<BoardDto> board = boardRepository.findById(id);
        return board.orElse(null);
    }

    public List<BoardDto> getAllBoards() {
        return boardRepository.findAll();
    }

    public BoardDto updateBoard(int id, BoardDto BoardDto) {
        Optional<BoardDto> existingBoard = boardRepository.findById(id);
        if (existingBoard.isPresent()) {
            BoardDto updatedBoard = existingBoard.get();
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
