import { Todo, FilterType } from '@/types';
import { contains, isOfType } from './todos';
import { describe, expect, test } from 'vitest';

const learnReact: Todo = {
  id: '1',
  title: 'Learn React',
  description: 'Learn React and build a to-do app',
  isCompleted: true,
};

const applyForCIQ: Todo = {
  id: '3',
  title: 'Apply for CIQ',
  description: 'Apply for CIQ and get a job',
  isCompleted: false,
};

describe('todos utils', () => {
  describe('contains', () => {
    test('returns true if string is contained in title', () => {
      expect(contains(learnReact, 'React')).toBe(true);
    });

    test('returns true if string is contained in description', () => {
      expect(contains(learnReact, 'build')).toBe(true);
    });

    test('returns false if string is not contained in title or description', () => {
      expect(contains(learnReact, 'Vue')).toBe(false);
    });
  });

  describe('is', () => {
    describe('All', () => {
      test('always returns true if filter is All', () => {
        expect(isOfType(learnReact, FilterType.All)).toBe(true);
      });
    });

    describe('Completed', () => {
      test('returns true if todo is completed', () => {
        expect(isOfType(learnReact, FilterType.Completed)).toBe(true);
      });

      test('returns false if todo is not completed', () => {
        expect(isOfType(applyForCIQ, FilterType.Completed)).toBe(false);
      });
    });

    describe('Active', () => {
      test('returns true if todo is not completed', () => {
        expect(isOfType(applyForCIQ, FilterType.Active)).toBe(true);
      });

      test('returns false if todo is completed', () => {
        expect(isOfType(learnReact, FilterType.Active)).toBe(false);
      });
    });
  });
});
