import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { cn } from '@/lib/utils'
import { NeuInput } from '@/components/ui/neu-input'

interface AutocompleteInputProps {
  value: string
  onChange: (value: string) => void
  suggestions: string[]
  placeholder?: string
}

/**
 * 커스텀 콤보박스. `<datalist>`는 iOS Safari에서 지원이 불안정해 직접 구현했다.
 * 목록에 없는 값도 자유롭게 입력할 수 있다 — 어디까지나 제안일 뿐 값을 제한하지 않는다.
 */
export function AutocompleteInput({
  value,
  onChange,
  suggestions,
  placeholder,
}: AutocompleteInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const listId = useId()

  const filtered = value.trim()
    ? suggestions.filter((item) => item.includes(value.trim()))
    : suggestions

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectSuggestion = (item: string) => {
    onChange(item)
    setIsOpen(false)
    setHighlightedIndex(-1)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || filtered.length === 0) return
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setHighlightedIndex((prev) => (prev + 1) % filtered.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setHighlightedIndex((prev) => (prev - 1 + filtered.length) % filtered.length)
    } else if (event.key === 'Enter' && highlightedIndex >= 0) {
      event.preventDefault()
      selectSuggestion(filtered[highlightedIndex])
    } else if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <NeuInput
        value={value}
        onChange={(event) => {
          onChange(event.target.value)
          setIsOpen(true)
          setHighlightedIndex(-1)
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-autocomplete="list"
        autoComplete="off"
      />
      {isOpen && filtered.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          className="neu-surface absolute z-10 mt-2 w-full rounded-xl p-1"
        >
          {filtered.map((item, index) => (
            <li key={item} role="option" aria-selected={index === highlightedIndex}>
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => selectSuggestion(item)}
                className={cn(
                  'w-full rounded-lg px-3 py-2 text-left text-sm',
                  index === highlightedIndex ? 'neu-inset' : 'hover:neu-inset',
                )}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
